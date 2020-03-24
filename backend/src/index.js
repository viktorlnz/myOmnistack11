const express = require('express');

const routes = require('./routes');

/*  USANDO O KNEX, UM QUERY BUILDER PARA BANCOS SQL

    instalar:
    npm install knex

    instalar o driver do sgbd:
    npm install sqlite3 (utilizado pelo uso simples)

    depois de configurar o seu knexfile.js:
    npx knex migrate:make create_ongs (por exemplo)

    Vá na migration criada e configure o banco e depois disso:
    npx knex migrate:latest

*/

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);