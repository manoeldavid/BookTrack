const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./user.model');

const Book = sequelize.define('Book', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 100] }
    },
    autor: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('Lido', 'Quero Ler', 'Lendo'),
        allowNull: false,
    },
    avaliacao: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 },
        allowNull: true,
    },
    dataConclusao: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

//relacionamento 1 usuário para N livros
User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Book };