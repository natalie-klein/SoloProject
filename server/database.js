const { Pool } = require('pg')
const pool = new Pool({
    user: 'boypphsb',
    host: 'isilo.db.elephantsql.com',
    database: 'boypphsb',
    password: 'KWQ0BQdcOn77d56AfyAAt1XwgXK_LghX',
    port: 5432,
    max: 2
  });

pool.connect((err) => {
    if (err) throw new Error(err);
    else console.log('connected to db!');
});

module.exports = pool;

