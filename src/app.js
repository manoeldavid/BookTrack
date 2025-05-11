// src/app.js
const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

const bookRoutes = require('./routes/book.routes');
app.use('/books', bookRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'public')));
const rootDir = path.resolve(__dirname, '..');

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});


// rotas
app.use('/users', userRoutes);

module.exports = app;
