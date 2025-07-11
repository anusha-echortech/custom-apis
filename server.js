const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const dbFile = './db.json';

function readDB() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}, null, 2));
  }
  const data = fs.readFileSync(dbFile);
  return JSON.parse(data);
}


function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}



app.get('/:resource', (req, res) => {
  const { resource } = req.params;
  const db = readDB();
  const data = db[resource];
  if (!data) return res.status(404).json({ message: 'Resource not found' });
  res.json(data);
});


app.get('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  const db = readDB();
  const data = db[resource];
  if (!data) return res.status(404).json({ message: 'Resource not found' });
  const item = data.find(i => i.id === parseInt(id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});


app.post('/:resource', (req, res) => {
  const { resource } = req.params;
  const db = readDB();
  if (!db[resource]) db[resource] = [];
  const newItem = req.body;
  newItem.id = db[resource].length ? db[resource][db[resource].length - 1].id + 1 : 1;
  db[resource].push(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});


app.put('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  const db = readDB();
  const data = db[resource];
  if (!data) return res.status(404).json({ message: 'Resource not found' });
  const index = data.findIndex(i => i.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  data[index] = { ...data[index], ...req.body };
  writeDB(db);
  res.json(data[index]);
});


app.delete('/:resource/:id', (req, res) => {
  const { resource, id } = req.params;
  const db = readDB();
  const data = db[resource];
  if (!data) return res.status(404).json({ message: 'Resource not found' });
  const index = data.findIndex(i => i.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  const deleted = data.splice(index, 1);
  writeDB(db);
  res.json(deleted[0]);
});



app.get('/profile', (req, res) => {
  const db = readDB();
  if (!db.profile) db.profile = {};
  res.json(db.profile);
});

app.put('/profile', (req, res) => {
  const db = readDB();
  db.profile = { ...db.profile, ...req.body };
  writeDB(db);
  res.json(db.profile);
});

// --- Start server ---
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
