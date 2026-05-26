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

// GET /api/data — read persisted content
app.get('/api/data', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json(null);
    res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/auth — validate password, return token
app.post('/api/auth', (req, res) => {
  if (req.body && req.body.password === ADMIN_PASSWORD) return res.json({ token: ADMIN_TOKEN });
  res.status(401).json({ error: 'Invalid password' });
});

// POST /api/data — persist content
app.post('/api/data', requireAuth, (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /.image-slots.state.json — image-slot.js reads this on page load
app.get('/.image-slots.state.json', (req, res) => {
  try {
    if (!fs.existsSync(SLOTS_FILE)) return res.status(404).end();
    res.set('Content-Type', 'application/json');
    res.send(fs.readFileSync(SLOTS_FILE, 'utf8'));
  } catch (e) {
    res.status(500).end();
  }
});

// POST /api/slots — image-slot.js writes here after every drop/reframe
app.post('/api/slots', requireAuth, express.text({ limit: '50mb' }), (req, res) => {
  try {
    fs.writeFileSync(SLOTS_FILE, req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`AKC → http://localhost:${PORT}`));
}

module.exports = app;
