// src/app.js
const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());

const bookRoutes = require('./routes/book.routes');
app.use('/books', bookRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

// rotas
app.use('/users', userRoutes);

module.exports = app;
