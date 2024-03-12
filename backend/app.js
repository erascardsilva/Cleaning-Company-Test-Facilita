const express = require('express');
const app = express();
const pool = require('./config/configDB');
const userRoute = require('./crud/userCrud');
const routeCalc = require('./ routeLlogic/routeCalc');
const cepRoute = require('./externService/apiCep'); 
const PORT = process.env.PORT || 3001;

//Enabling use of JSON
app.use(express.json());

//middleware no Express.js
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

//connection to routes in /crud
app.use('/api', userRoute);

//connect data cep 
app.use('/api' , cepRoute);

// Calcule excelent route
app.use('/api', routeCalc);


// Servidor ON
app.listen(PORT, () => {
    console.log(`Servidor Online ${PORT}`);
});