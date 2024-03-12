// Require package PG for connect PostgreSQL
const { Pool } = require('pg');

// data connect 
const pool = new Pool({
    user: process.env.DATABASE_USER || 'erasmo_dev',
    host: process.env.DATABASE_HOST || 'db',
    database: process.env.DATABASE_NAME || 'CleaningCompany',
    password: process.env.DATABASE_PASSWORD || '3727',
    port: process.env.DATABASE_PORT || 5432,
});

// Connect to the database and create the clientes table if it does not exist
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err);
    }
    console.log('Conexão com o banco de dados bem-sucedida!');
    client.query('SELECT NOW()', (err, result) => {
        if (err) {
            release();
            return console.error('Erro ao executar a consulta:', err);
        }
        console.log('Hora atual do banco de dados:', result.rows[0].now);
        
        // Create if not exist
        client.query(`CREATE TABLE IF NOT EXISTS clientes (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            telefone TEXT NOT NULL,
            cep TEXT NOT NULL
        )`, (err, result) => {
            if (err) {
                console.error('Erro ao criar a tabela clientes:', err);
            } else {
                console.log('Tabela clientes criada com sucesso ou já existente!');
            }
            release(); 
        });
    });
});

module.exports = pool;
