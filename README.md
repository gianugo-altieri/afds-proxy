# AFDS Proxy

Proxy leggero per eliminare gli errori CORS tra la PWA Mamma Diurna e il portale AFDSonline.

## Deploy su Render (gratuito)

1. Crea un account su https://github.com e un nuovo repository chiamato `afds-proxy`
2. Carica questi tre file: `server.js`, `package.json`, `README.md`
3. Vai su https://render.com → New → Web Service
4. Collega il repository GitHub `afds-proxy`
5. Impostazioni:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Clicca **Deploy** — dopo ~2 minuti ottieni un URL tipo:
   `https://afds-proxy-xxxx.onrender.com`
7. Incolla quell'URL nell'app (scheda Impostazioni → URL Proxy)

## Note

- Il servizio gratuito si "addormenta" dopo 15 minuti di inattività.
- Al primo utilizzo dopo lo sleep impiega ~30 secondi a rispondere.
- Non conserva nessun dato — fa solo da ponte tra l'app e AFDS.
