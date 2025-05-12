__📚 BookTrack API  __

Uma API RESTful para gerenciamento de livros e leituras. Com ela, usuários podem cadastrar-se, adicionar livros, acompanhar o progresso de leitura e registrar avaliações.

**🚧 Projeto em desenvolvimento. Não possui deploy — apenas ambiente local via Docker.**

**🚀 Tecnologias  **

Node.js  

MySQL  

Docker / Docker Compose  

Insomnia (para testes das rotas)  


**🧱 Estrutura do Projeto  **

src/controllers/ — lógica das rotas  

src/models/ — definição dos modelos e conexões com o banco  

src/services/ — regras de negócio  

src/routes/ — endpoints da API  

docker-compose.yml — orquestração dos containers  


**📦 Variáveis de Ambiente  **

Crie um arquivo .env na raiz com as seguintes variáveis:  

DB_HOST=db  

DB_PORT=3306  

DB_USER=root  

DB_PASSWORD=1234  

DB_NAME=booktrack  


**🐳 Como rodar o projeto localmente com Docker  **

1. Clone o repositório
   
git clone https://github.com/seu-usuario/booktrack.git  

cd booktrack  

3. Suba o banco de dados
   
docker-compose up db  

Aguarde até o MySQL estar pronto (pode demorar alguns segundos).  

5. Em outro terminal, suba a aplicação
   
docker-compose up app  

Isso iniciará a API na porta 3000 (ou outra que esteja configurada).  


**⚠️ Importante:  **

Para testar as funcionalidades dos livros, é necessário que primeiro você cadastre um usuário, vá ao Insomnia(ou qualquer ferramenta de teste da API) e faça login(rota estará disponível no arquivo); ao fazer login, terá um token que será necessário para usar nos métodos que se tratam dos livros. Esse token deve ser usado(no caso do Insomnia): primeiro, nos headers da requisição, adicione outro chamado "Authorization"; no campo ao lado: "Bearer " + token recebido. Isto é o suficiente para acessar tudo.

**🧪 Testando com Insomnia  **

Use o Insomnia para testar as rotas. Você pode importar o arquivo "" com uma coleção de rotas pro Insomnia(contém todos os testes dos requisitos do projeto) ou testar manualmente:

**📍 Rotas principais  **

👤 Usuários  

POST / — Cadastrar usuário  

GET / — Listar usuários  

DELETE /:id — Deletar usuário  


**📚 Livros(para todos, tem que logar no usuário)  **

POST / — Cadastrar livro  

GET / — Listar livros do usuário  

GET /export - exportar pra um .json no Insomnia  

PUT /:id — Editar livro  

DELETE /:id — Deletar livro  


**⚠️ Algumas regras importantes:  **

Só é possível avaliar livros com status "Lido".  

Livros "Lido" não podem ser editados.  

Só o dono do livro pode alterá-lo ou removê-lo.  




