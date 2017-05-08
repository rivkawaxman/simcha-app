var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'simcha',
    password : '123456',
    database : 'simcha-fund'
  }
});

export default knex;