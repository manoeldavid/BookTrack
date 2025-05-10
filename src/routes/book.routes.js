const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');
const authenticate = require('../middleware/auth.middleware');

router.use(authenticate); // todas as rotas abaixo exigem token

// Rota para criar um livro
router.post('/', BookController.createBook);
// Rota para obter todos os livros
router.get('/', BookController.getAllBooks);
// Rota para atualizar um livro
router.put('/:id', BookController.updateBook);
// Rota para deletar um livro
router.delete('/:id', BookController.deleteBook);
// Rota para exportar livros
router.get('/export', authenticate, BookController.exportBooks);

module.exports = router;