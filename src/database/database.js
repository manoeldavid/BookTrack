const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`booktrack`, 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
