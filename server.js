const app = require('./src/app');
const sequelize = require('./src/database/database');

// Importa os models (para registrar os relacionamentos)
require('./src/models/user.model');
require('./src/models/book.model');

const PORT = 3000;

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync({ alter: true }) // { force: true } zera tudo; alter atualiza sem apagar
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
