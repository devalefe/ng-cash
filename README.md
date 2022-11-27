<h1 align="center">NG.Cash | A Carteira Digital do Futuro</h1>

<img src="/media/1.png" alt="" width="100%">

<br>

<h1>Sumário</h1>
<ul>
  <li><a href="#descricao">Descrição geral do projeto</a></li>
  <li><a href="#tecnologias">Tecnologias usadas</a></li>
  <li><a href="#requisitos">Requisitos gerais</a></li>
  <li><a href="#init-with-docker">Iniciando projeto com Docker</a></li>
  <li><a href="#init-without-docker">Iniciando projeto sem Docker</a></li>
  <li><a href="#consideracoes">Considerações Finais</a></li>
</ul>

<br>

<a name="#descricao">
<h1>Descrição do projeto</h1>

<p>Basicamente é um sistema de transações bancárias, onde qualquer pessoa pode realizar um cadastro e já receber R$ 100,00. O projeto conta com uma API em Node e um front end em React, onde é possível realizar login, cadastro, novas transações e listagem das mesmas e conta com filtro baseado em tipo e/ou data.</p>

<br>

<a name="requisitos">
<h1>Requisitos</h1>

<p>
Para executar o projeto você precisará do <a traget="_blank" href="https://docs.docker.com/">Docker</a>.<br>
Caso não queira usar o Docker (não recomendado), deverá instalar todas as dependêcias citadas abaixo.
</p>

<br>

<a name="#tecnologias">
<h1>Tecnologias usadas</h1>

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

<br>

<a name="init-with-docker">
<h1>Iniciando o projeto com Docker</h1>

<p>Para iniciar o projeto com o Docker, basta seguir os passos abaixo:</p>

```bash

# Após instalar o Docker, basta rodar este comando
$ docker compose up -d

# A flag -d indica que o container rodará em modo detached, 
# ou seja, não ocupará o terminal. Viva ao Docker!

# Para gerar dados de teste (seed), basta rodar o comando abaixo
$ docker exec api npx prisma migrate dev --name init

# Por fim, você poderá abrir o sistema em http://localhost:80/

```

<br>

<a name="init-without-docker">
<h1>Iniciando o projeto sem o Docker</h1>

<p>Caso opte por não usar o Docker (o que eu não recomendo), basta seguir os passos abaixo.</p>

<p>Vamos começar com o backend:</p>

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

<p>Agora para o frontend:</p>

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

<br>

<a name="consideracoes">
<h1>Considerações finais</h1>

<p>
Caso queira ver uma prévia de como é o projeto, abra a pasta 
<a traget="_blank" href="/media">media</a> 
ou clique no 
<a traget="_blank" href="https://www.youtube.com/watch?v=6npR13NLj9E">link</a> 
para ver o vídeo demonstrativo no Youtube.
</p>
