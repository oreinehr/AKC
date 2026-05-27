const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

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

let redis, put;
if (USE_KV) {
  const { Redis } = require('@upstash/redis');
  redis = new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
}
if (USE_BLOB) {
  put = require('@vercel/blob').put;
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
      return res.json(data || null);
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
      const slots = await redis.get('akc:slots');
      if (!slots) return res.status(404).end();
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
                addRandomSuffix: false,
                allowOverwrite: true,
              });
              val.u = blob.url;
            }
          }
        }
      }
      await redis.set('akc:slots', slots);
      return res.json({ ok: true });
    }
    fs.writeFileSync(SLOTS_FILE, req.body);
    res.json({ ok: true });
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

if (require.main === module) {
  app.listen(PORT, () => console.log(`AKC → http://localhost:${PORT}`));
}

module.exports = app;
