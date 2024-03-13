const express = require('express');
const cors = require('cors'); // Importe o pacote cors
const app = express();
const pool = require('./config/configDB');
const userRoute = require('./crud/userCrud');
const routeCalc = require('./ routeLlogic/routeCalc');; 
const cepRoute = require('./externService/apiCep'); 
const PORT = process.env.PORT || 3001;

// Habilitando o uso de JSON
app.use(express.json());

// Middleware no Express.js para adicionar pool ao objeto de solicitação
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Adicionando o middleware CORS
app.use(cors());

// Conexão com rotas em /crud
app.use('/api', userRoute);

// Conexão com dados do CEP 
app.use('/api', cepRoute);

// Rota para cálculo de rotas
app.use('/api', routeCalc);

// Servidor ON
app.listen(PORT, () => {
    console.log(`Servidor Online ${PORT}`);
});
