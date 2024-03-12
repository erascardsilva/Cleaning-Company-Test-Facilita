const express = require('express');
const app = express();
const pool = require('./config/configDB');
const userRoute = require('./crud/userCrud');
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

// Servidor ON
app.listen(PORT, () => {
    console.log(`Servidor Online ${PORT}`);
});