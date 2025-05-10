const BookService = require('../services/book.services');

const createBook = async (req, res) => {
    try {
        const bookData = {
            ...req.body,
            userId: req.user.id // Adiciona o ID do usuário autenticado
        };
        const book = await BookService.createBook(bookData);
        return res.status(201).json(book);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getAllBooks = async (req, res) => {
    return res.json(await BookService.getAllBooks());
};

const updateBook = async (req, res) => {
    try {
        const book = BookService.updateBook(req.params.id, req.body, req.user.id);
        return res.json(book);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        BookService.deleteBook(req.params.id, req.user.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Exports JSON e CSV
const { Parser } = require('json2csv');
const livrosService = require('../services/book.services');

async function exportBooks(req, res) {
    const userId = req.user.id;
    const formato = req.query.formato || 'json';

    try {
        const livros = await livrosService.listBooksPerUser(userId);
        console.log('Usuário autenticado:', req.user); // Verifica se o usuário está autenticado
        console.log('Livros encontrados:', livros); // Verifica os livros encontrados

        if (formato === 'csv') {
            const campos = ['id', 'titulo', 'autor', 'status', 'avaliacao', 'dataConclusao'];
            const parser = new Parser({ fields: campos });
            const csv = parser.parse(livros);
            res.header('Content-Type', 'text/csv');
            res.attachment('books.csv');
            return res.send(csv);
        }

        // Exportação JSON (padrão)
        res.header('Content-Type', 'application/json');
        res.attachment('books.json');
        return res.send(JSON.stringify(livros, null, 2));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao exportar livros' });
    }
}

module.exports = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    exportBooks
    // listBooksPerUser
};