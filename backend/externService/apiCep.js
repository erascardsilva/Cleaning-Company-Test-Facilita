const axios = require('axios');
const NodeGeocoder = require('node-geocoder');
const express = require('express');
const route = express.Router();

// Configuração para utilizar o serviço Nominatim
const options = {
  provider: 'openstreetmap'
};
const geocoder = NodeGeocoder(options);

route.get('/cep/:cep', async (req, res) => {
    const cep = req.params.cep;
    try {
        // Consulta ao serviço de geocodificação para obter as coordenadas a partir do CEP
        const location = await geocoder.geocode(cep);

        // Verifica se foram encontradas coordenadas
        if (location.length > 0) {
            const { latitude, longitude } = location[0];
            res.json({
                latitude,
                longitude
            });
        } else {
            res.status(404).json({ message: 'Coordenadas não encontradas para o CEP' });
        }
    } catch (error) {
        console.error('Erro ao buscar coordenadas:', error);
        res.status(500).json({ message: 'Erro ao buscar coordenadas' });
    }
});

module.exports = route;
