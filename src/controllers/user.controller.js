// src/controllers/user.controller.js

const UserService = require('../services/user.services');

const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
    const users  = await UserService.getAllUsers();
    return res.json(users);
}

const deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        return res.status(204).send();
    } catch(error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
};
