const jwt = require('jsonwebtoken');
const SECRET = 'seu_segredo_supersecreto';

const authenticate = (req, res, next) => {
    console.log('Headers recebidos:', req.headers); // headers chegando
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authenticate;
