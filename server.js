const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

// Load .env.local for local dev. On Vercel the platform injects env vars
// directly, so a missing file here is expected and harmless.
require('dotenv').config({ path: path.join(__dirname, '.env.local'), quiet: true });

const app        = express();
const PORT       = process.env.PORT || 3000;
const DATA_FILE  = path.join(__dirname, 'data.json');
const SLOTS_FILE = path.join(__dirname, '.image-slots.state.json');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'akc';
const ADMIN_TOKEN    = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest('hex');
if (!process.env.ADMIN_PASSWORD) {
  console.warn('⚠  ADMIN_PASSWORD not set — using default "akc". Set it before going to production.');
}

// True when Vercel Marketplace KV + Blob env vars are present
const USE_KV   = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const USE_BLOB = !!(process.env.BLOB_READ_WRITE_TOKEN);

let redis, put, generateBlobClientToken;
if (USE_KV) {
  const { Redis } = require('@upstash/redis');
  redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
}
if (USE_BLOB) {
  put = require('@vercel/blob').put;
  generateBlobClientToken = require('@vercel/blob/client').generateClientTokenFromReadWriteToken;
}

function requireAuth(req, res, next) {
  if (req.headers.authorization === `Bearer ${ADMIN_TOKEN}`) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => {
  if (req.path.endsWith('.jsx') || req.path.endsWith('.js') || req.path.endsWith('.css')) {
    res.set('Cache-Control', 'no-store');
  }
  next();
});
// OG meta injection — crawlers don't run JS, so title/description/image must be server-rendered
// Intercept blog-post.html and case-study.html before static middleware.
const _ogEsc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const _str   = (v) => typeof v === 'object' ? (v.en || v.pt || '') : (v || '');

async function _getKvData() {
  if (USE_KV) return redis.get('akc:data');
  if (fs.existsSync(DATA_FILE)) return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  return null;
}
async function _getKvSlots() {
  if (USE_KV) return redis.get('akc:slots') || {};
  if (fs.existsSync(SLOTS_FILE)) return JSON.parse(fs.readFileSync(SLOTS_FILE, 'utf8'));
  return {};
}

app.get('/blog-post.html', async (req, res, next) => {
  try {
    const slug = req.query.slug;
    const html = fs.readFileSync(path.join(__dirname, 'blog-post.html'), 'utf8');
    if (!slug) return res.type('html').send(html);

    const [data, slots] = await Promise.all([_getKvData(), _getKvSlots()]);
    const post = (data?.blog || []).find(b => b.slug === slug);
    if (!post) return res.type('html').send(html);

    const coverUrl = slots[`post-cover-${slug}`]?.u || null;
    const title    = _str(post.title);
    const desc     = _str(post.excerpt || post.subtitle || post.body?.[0]?.text || '');
    const canonical = `https://www.akcontes.com/blog-post.html?slug=${slug}`;

    let injected = html
      .replace(/<title>[^<]*<\/title>/, `<title>${_ogEsc(title)} — Alessandro Kuhn Contes</title>`)
      .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${_ogEsc(desc)}" />`)
      .replace('<meta property="og:type" content="article" />',
        `<meta property="og:type" content="article" />\n` +
        `<meta property="og:title" content="${_ogEsc(title)} — Alessandro Kuhn Contes" />\n` +
        `<meta property="og:description" content="${_ogEsc(desc)}" />\n` +
        `<meta property="og:url" content="${canonical}" />\n` +
        (coverUrl ? `<meta property="og:image" content="${_ogEsc(coverUrl)}" />\n` : '') +
        `<meta name="twitter:card" content="${coverUrl ? 'summary_large_image' : 'summary'}" />\n` +
        (coverUrl ? `<meta name="twitter:image" content="${_ogEsc(coverUrl)}" />\n` : '')
      );

    res.type('html').send(injected);
  } catch (e) {
    next();
  }
});

app.use(express.static(__dirname));

app.get('/admin', (req, res) => res.redirect('/admin.html'));

// POST /api/auth — validate password, return token
app.post('/api/auth', (req, res) => {
  if (req.body && req.body.password === ADMIN_PASSWORD) return res.json({ token: ADMIN_TOKEN });
  res.status(401).json({ error: 'Invalid password' });
});

// GET /api/data — read persisted content
app.get('/api/data', async (req, res) => {
  try {
    if (USE_KV) {
      const data = await redis.get('akc:data');
      if (data) {
        // Auto-repair: ensure work[i].caseSlug matches cases[i].slug.
        // Matches work entries to cases by client/project name (case-insensitive).
        let repaired = false;
        for (const w of (data.work || [])) {
          const matchedCase = (data.cases || []).find(c => c.slug === w.caseSlug);
          if (matchedCase) continue;
          const wClient = (w.client || '').trim().toLowerCase();
          const fix = (data.cases || []).find(c =>
            (c.meta.client && c.meta.client.trim().toLowerCase() === wClient) ||
            (c.meta.project && c.meta.project.trim().toLowerCase() === wClient)
          );
          if (fix) { w.caseSlug = fix.slug; repaired = true; }
        }
        if (repaired) await redis.set('akc:data', data);
        return res.json(data);
      }
      return res.json(null);
    }
    if (!fs.existsSync(DATA_FILE)) return res.json(null);
    res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/data — persist content
app.post('/api/data', requireAuth, async (req, res) => {
  try {
    if (USE_KV) {
      await redis.set('akc:data', req.body);
      return res.json({ ok: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /.image-slots.state.json — image-slot.js reads this on page load
app.get('/.image-slots.state.json', async (req, res) => {
  try {
    if (USE_KV) {
      const slots = await redis.get('akc:slots') || {};
      const data  = await redis.get('akc:data');

      // Auto-migrate slot keys when case slugs changed. Maps old IDs → current slugs.
      // Safe to run on every read: only writes when a migration is needed.
      if (data && Array.isArray(data.cases)) {
        const MIGRATIONS = {};
        for (const c of data.cases) {
          const newId = c.slug;
          const oldIds = [];
          if (c.meta && c.meta.client) oldIds.push(c.meta.client.trim());
          if (c.meta && c.meta.project) oldIds.push(c.meta.project.trim());
          // Also include any work entry caseSlug that matched this case by client name
          for (const w of (data.work || [])) {
            const wc = (w.client || '').trim();
            if (
              wc &&
              ((c.meta.client && wc.toLowerCase() === c.meta.client.trim().toLowerCase()) ||
               (c.meta.project && wc.toLowerCase() === c.meta.project.trim().toLowerCase()))
            ) {
              if (w.caseSlug) oldIds.push(w.caseSlug);
            }
          }
          for (const old of oldIds) {
            if (old && old !== newId) MIGRATIONS[old] = newId;
          }
        }

        let changed = false;
        const updated = { ...slots };
        for (const [oldId, newId] of Object.entries(MIGRATIONS)) {
          for (let i = 0; i < 30; i++) {
            const oldOut = `case-output-${oldId}-${i}`;
            const newOut = `case-output-${newId}-${i}`;
            if (updated[oldOut] && !updated[newOut]) { updated[newOut] = updated[oldOut]; changed = true; }
          }
          const oldCover = `case-cover-${oldId}`;
          const newCover = `case-cover-${newId}`;
          if (updated[oldCover] && !updated[newCover]) { updated[newCover] = updated[oldCover]; changed = true; }
        }
        if (changed) await redis.set('akc:slots', updated);
        res.set('Content-Type', 'application/json');
        return res.json(changed ? updated : slots);
      }

      if (!Object.keys(slots).length) return res.status(404).end();
      res.set('Content-Type', 'application/json');
      return res.json(slots);
    }
    if (!fs.existsSync(SLOTS_FILE)) return res.status(404).end();
    res.set('Content-Type', 'application/json');
    res.send(fs.readFileSync(SLOTS_FILE, 'utf8'));
  } catch (e) {
    res.status(500).end();
  }
});

// POST /api/slots — image-slot.js writes here after every drop/reframe
// On Vercel: extracts base64 images → uploads to Blob → stores URLs in KV
app.post('/api/slots', requireAuth, express.text({ limit: '50mb' }), async (req, res) => {
  try {
    if (USE_KV) {
      const slots = JSON.parse(req.body);
      if (USE_BLOB) {
        for (const [id, val] of Object.entries(slots)) {
          if (val && typeof val.u === 'string' && val.u.startsWith('data:image/')) {
            const match = val.u.match(/^data:(image\/[\w+]+);base64,(.+)$/);
            if (match) {
              const [, mime, b64] = match;
              const ext = mime === 'image/jpeg' ? 'jpg' : mime.split('/')[1] || 'webp';
              const buf = Buffer.from(b64, 'base64');
              const blob = await put(`slots/${id}.${ext}`, buf, {
                access: 'public',
                contentType: mime,
                addRandomSuffix: true,
              });
              val.u = blob.url;
            }
          }
        }
      }
      // Merge into existing KV so stripped base64 entries (filtered on client)
      // are preserved. Null values mean the slot was cleared — delete them.
      const existing = (await redis.get('akc:slots')) || {};
      const merged = { ...existing };
      for (const [id, val] of Object.entries(slots)) {
        if (val === null || val === undefined) delete merged[id];
        else merged[id] = val;
      }
      await redis.set('akc:slots', merged);
      return res.json({ ok: true });
    }
    fs.writeFileSync(SLOTS_FILE, req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/blob-token — issues a short-lived Vercel Blob client token so the
// browser can PUT videos directly to the Blob CDN (bypasses the 4.5 MB serverless
// request-body limit). Returns { local: true } when Blob is not configured.
app.post('/api/blob-token', requireAuth, async (req, res) => {
  if (!USE_BLOB || !generateBlobClientToken) return res.json({ local: true });
  try {
    const name = (req.body.name || `video-${Date.now()}`).replace(/[^a-z0-9._-]/gi, '_');
    const contentType = req.body.contentType || 'video/mp4';
    const pathname = `uploads/${name}`;
    const clientToken = await generateBlobClientToken({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      pathname,
      allowedContentTypes: [contentType, 'application/octet-stream'],
      maximumSizeInBytes: 500 * 1024 * 1024,
    });
    res.json({ clientToken, pathname });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/upload — raw binary file upload to Vercel Blob (or local /uploads)
// Used by video uploads from the admin panel. Query: ?name=filename.ext
app.post('/api/upload', requireAuth, express.raw({ limit: '500mb', type: '*/*' }), async (req, res) => {
  try {
    const raw = (req.query.name || `upload-${Date.now()}`);
    const name = raw.replace(/[^a-z0-9._-]/gi, '_');
    const mime = req.headers['content-type'] || 'application/octet-stream';
    if (USE_BLOB) {
      const blob = await put(`uploads/${name}`, req.body, {
        access: 'public',
        contentType: mime,
        addRandomSuffix: false,
      });
      return res.json({ ok: true, url: blob.url });
    }
    // Local fallback
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync(path.join(dir, name), req.body);
    res.json({ ok: true, url: `/uploads/${name}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/translate — translate EN strings to PT-BR via Claude.
// Body: { texts: ["...", "..."] } → { translations: ["...", "..."] } (same order/length).
app.post('/api/translate', requireAuth, async (req, res) => {
  const texts = req.body && req.body.texts;
  if (!Array.isArray(texts) || !texts.length) return res.status(400).json({ error: 'texts[] required' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set on the server' });

  const SYSTEM = [
    'You translate portfolio copy for a Brazilian creative director from English to Brazilian Portuguese (pt-BR).',
    '',
    'Rules:',
    '- Translate meaning and tone, not word for word. The voice is direct, confident, editorial — never corporate or marketing-inflated.',
    '- Preserve every newline, blank line, and markdown marker (>, #, -, **) exactly as in the source.',
    '- Keep proper nouns, brand names, product names, job titles that are used in English in Brazil (e.g. Creative Director → Diretor Criativo, but Product Designer stays), and technical terms that Brazilian designers use in English (brand, design system, landing page, briefing).',
    '- Do not add, remove, or explain anything. Output the translation only.',
  ].join('\n');

  try {
    const Anthropic = require('@anthropic-ai/sdk');
    const client = new Anthropic();
    const payload = texts.map((t, i) => ({ id: i, text: String(t) }));

    const stream = client.messages.stream({
      model: 'claude-sonnet-5',
      max_tokens: 64000,
      thinking: { type: 'adaptive' },
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: 'Translate the "text" of each item below to pt-BR.\n\n' + JSON.stringify(payload, null, 2),
      }],
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { id: { type: 'integer' }, text: { type: 'string' } },
                  required: ['id', 'text'],
                  additionalProperties: false,
                },
              },
            },
            required: ['items'],
            additionalProperties: false,
          },
        },
      },
    });

    const msg = await stream.finalMessage();
    if (msg.stop_reason === 'refusal') return res.status(422).json({ error: 'Translation refused by the model' });

    const raw = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    const parsed = JSON.parse(raw);
    const byId = new Map(parsed.items.map((it) => [it.id, it.text]));
    // Fall back to the source string when an item is missing — never silently shift order.
    res.json({ translations: texts.map((t, i) => (byId.has(i) ? byId.get(i) : String(t))) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`AKC → http://localhost:${PORT}`));
}

module.exports = app;
