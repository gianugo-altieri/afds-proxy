const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET = 'https://afdsonline.famigliediurne.ch/sirioweb';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'AFDS Proxy' });
});

app.post('/api/:endpoint', async (req, res) => {
  const url = `${TARGET}/${req.params.endpoint}`;
  console.log(`→ ${req.params.endpoint}`, JSON.stringify(req.body).slice(0, 120));
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'it-IT,it;q=0.9',
        'Origin': 'https://afdsonline.famigliediurne.ch',
        'Referer': 'https://afdsonline.famigliediurne.ch/',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log(`← ${req.params.endpoint} [${response.status}]`, text.slice(0, 200));

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `AFDS HTTP ${response.status}: ${text.slice(0, 300)}`
      });
    }

    try {
      res.json(JSON.parse(text));
    } catch(e) {
      res.status(502).json({ success: false, message: 'Risposta non-JSON da AFDS: ' + text.slice(0, 200) });
    }

  } catch (err) {
    console.error(`✗ ${req.params.endpoint}:`, err.message);
    res.status(502).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AFDS Proxy attivo su porta ${PORT}`);
});
