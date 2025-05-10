const request = require('supertest');
const app = require('../app'); // ajuste se necessário

describe('Livros - Rotas protegidas', () => {
  it('deve impedir criar livro sem autenticação', async () => {
    const res = await request(app).post('/books').send({
      titulo: '1984',
      status: 'Lido',
      avaliacao: 5
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
