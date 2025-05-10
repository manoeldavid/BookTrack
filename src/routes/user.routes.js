// src/routes/user.routes.js
const express = require('express');
const router = express.Router(); // use o roteador do Express
const UserController = require('../controllers/user.controller');

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
