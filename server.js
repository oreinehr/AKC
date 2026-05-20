const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app        = express();
const PORT       = process.env.PORT || 3000;
const DATA_FILE  = path.join(__dirname, 'data.json');
const SLOTS_FILE = path.join(__dirname, '.image-slots.state.json');

app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => {
  if (req.path.endsWith('.jsx') || req.path.endsWith('.js') || req.path.endsWith('.css')) {
    res.set('Cache-Control', 'no-store');
  }
  next();
});
app.use(express.static(__dirname));

// GET /api/data — read persisted content
app.get('/api/data', (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) return res.json(null);
    res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/data — persist content
app.post('/api/data', (req, res) => {
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
app.post('/api/slots', express.text({ limit: '50mb' }), (req, res) => {
  try {
    fs.writeFileSync(SLOTS_FILE, req.body);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`AKC → http://localhost:${PORT}`));
