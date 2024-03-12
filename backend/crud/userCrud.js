const express = require('express');
const pool = require('../config/configDB');
const route = express.Router();

//As requested Routes with explained DDL and without using ORM

//Route post
route.post('/savedate', async (req, res) => {
    try {
        const { nome, email, telefone, cep } = req.body;
        const newUser = await pool.query('INSERT INTO clientes (nome, email, telefone, cep) VALUES ($1, $2, $3, $4) RETURNING *', [nome, email, telefone, cep]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro de servidor');
    }
});

// Route get all user
route.get('/checkdata', async (req, res) => {
    try {
        const allUser = await pool.query(`SELECT * FROM clientes`);
        res.json(allUser.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

//Route get user ID
route.get('/checkdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userID = await pool.query(`SELECT * FROM clientes WHERE id = $1`, [id]);
        res.json(userID.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro de Servidor');
    }
});

//Route update data
route.put('/updatedata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone, cep } = req.body;
        const upUser = await pool.query(`UPDATE clientes SET nome = $1, email = $2, telefone = $3, cep = $4 WHERE id = $5 RETURNING *`, [nome, email, telefone, cep, id]);
        res.json(upUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

//Route delete data ID
route.delete('/deletedata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(`DELETE FROM clientes WHERE id = $1`, [id]);
        res.json(`Usuario excluido`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor');
    }
});

module.exports = route;
