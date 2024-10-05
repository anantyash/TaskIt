const { Pool } = require('pg');

const pool = new Pool({
  user: 'qwerty',
  host: 'localhost',
  database: 'TaskDB',
  password: 'qwerty',
  port: 5432,
});

module.exports = pool;