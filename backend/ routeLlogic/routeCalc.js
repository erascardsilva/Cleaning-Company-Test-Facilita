const express = require('express');
const NodeGeocoder = require('node-geocoder');
const route = express.Router();
const calRouteExcellent = require('./excellent');

// Configuração para utilizar o serviço Nominatim
const options = {
    provider: 'openstreetmap'
};
const geocoder = NodeGeocoder(options);

route.post('/calculate-route', async (req, res) => {
    // Receber informações da empresa e dos clientes
    const { company, client1, client2 } = req.body;

    try {
        // Obter coordenadas para a empresa e clientes
        const companyCoordinates = await fetchCoordinates(company.cep);
        const client1Coordinates = await fetchCoordinates(client1.cep);
        const client2Coordinates = await fetchCoordinates(client2.cep);

        // Calcular a rota ótima usando as coordenadas e os nomes dos clientes
        const optimalRoute = calRouteExcellent(companyCoordinates, client1Coordinates, client2Coordinates, client1.name, client2.name);

        // Retornar a rota ótima e a mensagem como resposta JSON
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
    // Verificar se os nomes dos clientes foram passados corretamente
    if (client1Name === undefined || client2Name === undefined || client1Name === null || client2Name === null) {
        throw new Error('Nomes dos clientes não fornecidos corretamente');
    }

    // Montar a lista de clientes na ordem de visita
    const clientList = [client1Name, client2Name];

    // Construir a mensagem com a lista de clientes na ordem de visita e a empresa
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
