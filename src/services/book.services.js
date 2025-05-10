const { Book } = require('../models/book.model');

// Criar um livro
async function createBook({ titulo, autor, status, avaliacao, userId }) {
    if (!titulo || titulo.length < 3 || titulo.length > 100) throw new Error('Título inválido');
    if (!status || !["Quero Ler", "Lendo", "Lido"].includes(status)) throw new Error('Status inválido');
    if (status === "Lido" && (avaliacao === undefined || avaliacao < 1 || avaliacao > 5)) throw new Error('Avaliação inválida');

    const dataConclusao = status === "Lido" ? new Date().toISOString().split('T')[0] : null;

    return await Book.create({
        titulo,
        autor: autor || null,
        status,
        avaliacao: status === "Lido" ? avaliacao : null,
        dataConclusao,
        userId
    });
}

// Buscar todos os livros
async function getAllBooks() {
    return await Book.findAll();
}

// Atualizar um livro
async function updateBook(id, data, userId) {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Livro não encontrado');

    if (book.userId !== userId) throw new Error('Usuário não autorizado a editar este livro');
    if (book.status === "Lido") throw new Error('Livro "Lido" não pode ser editado');

    // Validações
    if (data.status === "Lido" && (data.avaliacao === undefined || data.avaliacao < 1 || data.avaliacao > 5)) {
        throw new Error('Avaliação obrigatória para o status "Lido"');
    }

    book.titulo = data.titulo || book.titulo;
    book.autor = data.autor !== undefined ? data.autor : book.autor;
    book.status = data.status || book.status;

    if (data.status === "Lido") {
        book.avaliacao = data.avaliacao;
        book.dataConclusao = new Date().toISOString().split('T')[0];
    }

    await book.save();
    return book;
}

// Deletar um livro
async function deleteBook(id, userId) {
    const book = await Book.findByPk(id);
    if (!book) throw new Error('Livro não encontrado');
    if (book.userId !== userId) throw new Error('Usuário não autorizado a deletar este livro');

    await book.destroy();
}

// Listar livros por usuário
async function listBooksPerUser(userId) {
    return await Book.findAll({ where: { userId } });
}

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    listBooksPerUser
};
