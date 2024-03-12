const express = require('express');
const NodeGeocoder = require('node-geocoder');
const route = express.Router();
const calRouteExcellent = require('./excellent');

// Configuration to use the Nominatim service
const options = {
    provider: 'openstreetmap'
};
const geocoder = NodeGeocoder(options);

route.post('/calculate-route', async (req, res) => {

    const { company, client1, client2 } = req.body;

    try {
        // Get coordinates for the company and customers
        const companyCoordinates = await fetchCoordinates(company.cep);
        const client1Coordinates = await fetchCoordinates(client1.cep);
        const client2Coordinates = await fetchCoordinates(client2.cep);

        // Calculate the optimal route using customer coordinates and names
        const optimalRoute = calRouteExcellent(companyCoordinates, client1Coordinates, client2Coordinates, client1.name, client2.name);

        // Return the optimal route and message as a JSON response
        res.json(optimalRoute);
    } catch (error) {
        console.error('Erro ao calcular rota ótima:', error.message);
        res.status(500).json({ message: 'Erro ao calcular rota ótima' });
    }
});

async function fetchCoordinates(cep) {
    try {
        const location = await geocoder.geocode(cep);
        if (location.length === 0) {
            throw new Error(`Coordenadas não encontradas para o CEP: ${cep}`);
        }
        return { latitude: location[0].latitude, longitude: location[0].longitude };
    } catch (error) {
        console.error(`Erro ao buscar coordenadas para o CEP ${cep}:`, error);
        throw error;
    }
}

function buildMessage(optimalRoute, companyName, client1Name, client2Name) {
    // Check if customer names were passed correctly
    if (client1Name === undefined || client2Name === undefined || client1Name === null || client2Name === null) {
        throw new Error('Nomes dos clientes não fornecidos corretamente');
    }
    // Assemble the list of customers in the order of visit
    const clientList = [client1Name, client2Name];

    // Build the message with the list of customers in the order of visit and the company
    let message = `Você está na empresa ${companyName}. Deverá visitar primeiro `;
    for (let i = 0; i < clientList.length; i++) {
        message += `${clientList[i]}`;
        if (i < clientList.length - 1) {
            message += ', ';
        }
    }
    message += '.';

    return message;
}


module.exports = route;
