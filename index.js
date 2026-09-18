require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middleware ----

// Parse incoming JSON request bodies
app.use(express.json());

// Custom middleware: log every incoming request (BONUS)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve a static HTML page at "/"
app.use(express.static(path.join(__dirname, 'public')));

// ---- In-memory "database" ----
// A simple array to store users created via POST /user
const users = [];
let nextId = 1;

// ---- Routes ----
// GET / is handled by express.static above, which serves public/index.html
// (its content is "My Week 2 API!").

// POST /user -> Accepts { name, email }; responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({
      error: 'Both "name" and "email" are required.',
    });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);

  res.status(201).json({
    message: `Hello, ${name}!`,
    user: newUser,
  });
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({
      error: `No user found with id ${id}.`,
    });
  }

  res.json({
    message: `User ${id} profile`,
    user,
  });
});

// ---- Fallback error handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
