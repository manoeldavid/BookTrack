const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.services'); // supondo que tenha um

const SECRET = 'seu_segredo_supersecreto'; // coloque isso em .env no futuro

const register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await UserService.createUser({ nome, email, senha: hashedPassword });

        return res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await UserService.findByEmail(email);
        if (!user) throw new Error('Usuário não encontrado');

        const match = await bcrypt.compare(senha, user.senha);
        if (!match) throw new Error('Senha incorreta');

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '2h' });

        return res.json({ token });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
};

module.exports = {
    register,
    login
};
