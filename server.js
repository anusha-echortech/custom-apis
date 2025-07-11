const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const dbFile = './db.json';

function readDB() {
<<<<<<< HEAD
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}, null, 2));
  }
=======
>>>>>>> b073ec96be1f2416e75669859a540d7fb0316529
  const data = fs.readFileSync(dbFile);
  return JSON.parse(data);
}

<<<<<<< HEAD

=======
>>>>>>> b073ec96be1f2416e75669859a540d7fb0316529
function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

<<<<<<< HEAD


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

=======
// --- POSTS ---

// GET all posts
app.get('/posts', (req, res) => {
  const db = readDB();
  res.json(db.posts);
});

// GET post by ID
app.get('/posts/:id', (req, res) => {
  const db = readDB();
  const post = db.posts.find(p => p.id === parseInt(req.params.id));
  post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
});

// CREATE new post
app.post('/posts', (req, res) => {
  const db = readDB();
  const newPost = req.body;
  newPost.id = db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1;
  db.posts.push(newPost);
  writeDB(db);
  res.status(201).json(newPost);
});

// UPDATE post
app.put('/posts/:id', (req, res) => {
  const db = readDB();
  const index = db.posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    db.posts[index] = { ...db.posts[index], ...req.body };
    writeDB(db);
    res.json(db.posts[index]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// DELETE post
app.delete('/posts/:id', (req, res) => {
  const db = readDB();
  const index = db.posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = db.posts.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// --- COMMENTS ---

// GET all comments
app.get('/comments', (req, res) => {
  const db = readDB();
  res.json(db.comments);
});

// GET comment by ID
app.get('/comments/:id', (req, res) => {
  const db = readDB();
  const comment = db.comments.find(c => c.id === parseInt(req.params.id));
  comment ? res.json(comment) : res.status(404).json({ message: 'Comment not found' });
});

// CREATE new comment
app.post('/comments', (req, res) => {
  const db = readDB();
  const newComment = req.body;
  newComment.id = db.comments.length ? db.comments[db.comments.length - 1].id + 1 : 1;
  db.comments.push(newComment);
  writeDB(db);
  res.status(201).json(newComment);
});

// UPDATE comment
app.put('/comments/:id', (req, res) => {
  const db = readDB();
  const index = db.comments.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    db.comments[index] = { ...db.comments[index], ...req.body };
    writeDB(db);
    res.json(db.comments[index]);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// DELETE comment
app.delete('/comments/:id', (req, res) => {
  const db = readDB();
  const index = db.comments.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = db.comments.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// --- PROFILE ---

// GET profile
app.get('/profile', (req, res) => {
  const db = readDB();
  res.json(db.profile);
});

// UPDATE profile (PUT)
>>>>>>> b073ec96be1f2416e75669859a540d7fb0316529
app.put('/profile', (req, res) => {
  const db = readDB();
  db.profile = { ...db.profile, ...req.body };
  writeDB(db);
  res.json(db.profile);
});

// --- Start server ---
app.listen(port, () => {
<<<<<<< HEAD
  console.log(`✅ Server running at http://localhost:${port}`);
=======
  console.log(`Server running at http://localhost:${port}`);
>>>>>>> b073ec96be1f2416e75669859a540d7fb0316529
});
