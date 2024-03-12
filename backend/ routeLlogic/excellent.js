
// Function to calculate the distance between two points
function calDistance(point1, point2) {
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
// Function to calculate the distance between two points
function calDistance(point1, point2) {
    const deltaX = point2.longitude - point1.longitude;
    const deltaY = point2.latitude - point1.latitude;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Function to calculate the optimal route between the company and customers
function calRouteExcellent(companyCoordinates, client1Coordinates, client2Coordinates, client1Name, client2Name) {
    if (!companyCoordinates || !client1Coordinates || !client2Coordinates) {
        throw new Error('As coordenadas da empresa e dos clientes devem ser fornecidas');
    }
    // Calculate distances between points
    const distance1 = calDistance(companyCoordinates, client1Coordinates);
    const distance2 = calDistance(companyCoordinates, client2Coordinates);
    const distance3 = calDistance(client1Coordinates, client2Coordinates);

    // Calculates the total distance traveled for each customer visit order
    const totalDistance1 = distance1 + distance3;
    const totalDistance2 = distance2 + distance3;

    // Choose the order that minimizes the total distance
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


