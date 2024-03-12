// Função para calcular a distância entre dois pontos
function calDistance(point1, point2) {
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Função para calcular a rota ótima entre a empresa e os clientes
// Função para calcular a distância entre dois pontos
function calDistance(point1, point2) {
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Função para calcular a rota ótima entre a empresa e os clientes
function calRouteExcellent(companyCoordinates, client1Coordinates, client2Coordinates, client1Name, client2Name) {
    // Verifica se os parâmetros são objetos válidos
    if (!companyCoordinates || !client1Coordinates || !client2Coordinates) {
        throw new Error('As coordenadas da empresa e dos clientes devem ser fornecidas');
    }

    // Calcula as distâncias entre os pontos
    const distance1 = calDistance(companyCoordinates, client1Coordinates);
    const distance2 = calDistance(companyCoordinates, client2Coordinates);
    const distance3 = calDistance(client1Coordinates, client2Coordinates);

    // Calcula a distância total percorrida para cada ordem de visitação dos clientes
    const totalDistance1 = distance1 + distance3;
    const totalDistance2 = distance2 + distance3;

    // Escolhe a ordem que minimize a distância total
    let sortedClients;
    let totalDistance;
    let message;

    if (totalDistance1 < totalDistance2) {
        sortedClients = [client1Coordinates, client2Coordinates];
        totalDistance = totalDistance1;
        message = `Você deverá visitar primeiro ${client1Name} e depois ${client2Name} numa distância total de ${totalDistance}`;
    } else {
        sortedClients = [client2Coordinates, client1Coordinates];
        totalDistance = totalDistance2;
        message = `Você deverá visitar primeiro ${client2Name} e depois ${client1Name} numa distância total de ${totalDistance}`;
    }

    return {
        route: sortedClients,
        totalDistance,
        message
    };
}

module.exports = calRouteExcellent;


