const request = require('supertest');
const app = require('../app'); // ajuste o caminho se necessário
const { sequelize } = require('../models/user.model'); // ou onde está o sequelize do seu projeto

describe('Usuários - Cadastro, Listagem e Exclusão', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reinicia o banco de testes
  });

  let userId; // variável que vamos preencher depois do cadastro

  it('deve cadastrar um novo usuário', async () => {
    const res = await request(app).post('/users').send({
      nome: 'Milena',
      email: 'milena@example.com',
      senha: '123456'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('nome', 'Milena');

    userId = res.body.id;
  });

  it('deve listar todos os usuários', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('deve excluir o usuário cadastrado', async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });
});
