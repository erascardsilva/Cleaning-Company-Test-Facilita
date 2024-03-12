// Require package PG for connect PostgreSQL
const { Pool } = require('pg');

// data connect 
const pool = new Pool({
    user: process.env.DATABASE_USER || 'erasmo_dev',
    host: process.env.DATABASE_HOST || 'db',
    database: process.env.DATABASE_NAME || 'Cleaning-Company',
    password: process.env.DATABASE_PASSWORD || '3727',
    port: process.env.DATABASE_PORT || 5432,
});

// Checking database connection status
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err);
    }
    console.log('Conexão com o banco de dados bem-sucedida!');
    client.query('SELECT NOW()', (err, result) => {
        release(); 
        if (err) {
            return console.error('Erro ao executar a consulta:', err);
        }
        console.log('Hora atual do banco de dados:', result.rows[0].now);
    });
});

module.exports = pool;
