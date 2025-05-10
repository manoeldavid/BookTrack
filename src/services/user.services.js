const User = require('../models/user.model');

const createUser = async ({ nome, email, senha }) => {
    if (!nome || nome.length < 3) throw new Error('Nome inválido');
    if (!email || !/\S+@\S+\.\S+/.test(email)) throw new Error('Email inválido');

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) throw new Error('Email já cadastrado');

    const user = await User.create({ nome, email, senha });
    return user;
};

const getAllUsers = async () => {
    return await User.findAll({
        attributes: { exclude: ['senha'] } // opcional: esconder senha
    });
};

const deleteUser = async (id) => {
    const deleted = await User.destroy({ where: { id } });
    if (deleted === 0) throw new Error('Usuário não encontrado');
};

const findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    findByEmail
};
