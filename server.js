const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const TEXTS_FILE = path.join(__dirname, 'data', 'texts.json');

app.use(express.static('public'));
app.use(express.json());
app.listen(3000, '0.0.0.0');

// Ensure data folder exists
if (!fs.existsSync(TEXTS_FILE)) {
  fs.mkdirSync(path.dirname(TEXTS_FILE), { recursive: true });
  fs.writeFileSync(TEXTS_FILE, '[]');
}

app.post('/save', (req, res) => {
  const { text } = req.body;
  const texts = JSON.parse(fs.readFileSync(TEXTS_FILE, 'utf-8'));
  texts.push(text);
  fs.writeFileSync(TEXTS_FILE, JSON.stringify(texts, null, 2));
  res.sendStatus(200);
});

app.get('/texts', (req, res) => {
  const texts = JSON.parse(fs.readFileSync(TEXTS_FILE, 'utf-8'));
  res.json(texts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
