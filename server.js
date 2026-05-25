const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET = 'https://afdsonline.famigliediurne.ch/sirioweb';

// Accetta richieste da qualsiasi origine (la tua PWA)
app.use(cors());
app.use(express.json());

// Health check — Render lo usa per tenerlo sveglio
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'AFDS Proxy' });
});

// Proxy: inoltra qualsiasi POST /api/<endpoint> verso il portale AFDS
app.post('/api/:endpoint', async (req, res) => {
  const url = `${TARGET}/${req.params.endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(`Errore proxy [${req.params.endpoint}]:`, err.message);
    res.status(502).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AFDS Proxy attivo su porta ${PORT}`);
});
