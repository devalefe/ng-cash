<h1>Apresentação do projeto</h1>

<img src="/media/0.png" alt="apresentação do projeto" width="100%" />

<h2>Descrição do projeto</h2>

<p>Basicamente é um sistema de transações bancárias, onde qualquer pessoa pode realizar um cadastro e já receber R$ 100,00. O projeto conta com uma API em Node e um front end em React, onde é possível realizar login, cadastro, novas transações e listagem das mesmas e conta com filtro baseado em tipo e/ou data.</p>

## :rocket: Tecnologias usadas

### Backend: 
- [Typescript](https://www.typescriptlang.org/docs/);
- [NodeJS](https://nodejs.org/en/);
- [Fastify](https://www.fastify.io/);
- [Zod](https://zod.dev/);
- [Prisma-ORM](https://www.prisma.io/);
- [BCrypt](https://www.npmjs.com/package/bcrypt);
- [JWT](https://github.com/fastify/fastify-jwt).


### Fontend:
- [Typescript](https://www.typescriptlang.org/docs/);
- [ReactJS](https://pt-br.reactjs.org/);
- [Axios](https://axios-http.com/ptbr/docs/intro);
- [TailwindCSS](https://tailwindcss.com/);
- [Date-FNS](https://date-fns.org/docs/Getting-Started);
- [React-Router-DOM](https://reactrouter.com/en/main/upgrading/v5);
- [Phosphor-React](https://www.npmjs.com/package/phosphor-react).

### No banco de dados usei o [PostgreSQL](https://www.postgresql.org/docs/).


## :white_check_mark: Requisitos

<p>Para executar o projeto você precisa instalar todas as dependêcias citadas acima.</p>

### Vamos começar com o backend
<p>Para isso siga os passos abaixo:</p>

</div>

```bash

# Entre na pasta ng-cash
$ cd ng-cash

# Após abra a pasta da API
$ cd api

# Execute o comando e o projeto sera aberto no Visual Studio Code
$ code .

# Instale as dependências
$ npm install

# Após isso você precisa gerar as tables no DB.

# Não se esqueça de configurar o DB em prisma/schema.prisma e
# também a variável DATABASE_URL e a JWT_SECRET_KEY no arquivo .env

# Ah, e remova a extensão .example do arquivo .env

# Após, basta rodar o comando abaixo.
$ npx prisma migrate dev --name init

# Inicialize o servidor em modo desenvolvimento
$ npm run dev

# O servidor irá iniciar em http://localhost:3000

```

### Agora para o frontend

```bash

# Entre na pasta ng-cash
$ cd ..

# Após abra a pasta do projeto web
$ cd web

# Execute o comando e o projeto sera aberto no Visual Studio Code
$ code .

# Instale as dependências
$ npm install

# Inicialize o servidor em modo desenvolvimento
$ npm run dev

# O servidor irá iniciar em http://localhost:5173/

```
