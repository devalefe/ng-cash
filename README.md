<h1>Apresentação do projeto</h1>

<img src="/media/0.png" alt="apresentação do projeto" width="100%" />

<h2>Descrição do projeto</h2>

<p>Basicamente é um sistema de transações bancárias, onde qualquer pessoa pode realizar um cadastro e já receber R$ 100,00. O projeto conta com uma API em Node e um front end em React, onde é possível realizar login, cadastro, novas transações e listagem das mesmas e conta com filtro baseado em tipo e/ou data.</p>


## Tecnologias usadas

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

### Banco de dados:
- [PostgreSQL](https://www.postgresql.org/docs/).


## Requisitos

### Para executar o projeto você precisará do [Docker](https://docs.docker.com/).

```bash

# Após instalar o Docker, basta rodar este comando
$ docker compose up -d

# A flag -d indica que o container rodará em modo detached, 
# ou seja, não ocupará o terminal. Viva ao Docker!

# Para gerar dados de teste (seed), basta rodar o comando abaixo
$ docker exec api npx prisma migrate dev --name init

# Por fim, você poderá abrir o sistema em http://localhost:80/

```

### Caso não queira usar o Docker, deverá instalar todas as dependêcias citadas acima. 
<p>Para isso siga os passos abaixo:</p>

### Vamos começar com o backend

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

## Considerações finais

### Caso queira ver uma prévia de como é o projeto, abra a pasta media ou clique no [link](https://www.youtube.com/watch?v=6npR13NLj9E) para ver o vídeo demonstrativo.

<p>Bom, por hora é apenas isso! Um grande abraço, e não se esqueça de abrir uma PR caso necessite.</p>
