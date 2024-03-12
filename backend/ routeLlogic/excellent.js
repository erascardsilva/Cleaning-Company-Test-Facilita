
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
    
    // Calculate total distance in meters
    totalDistance = totalDistance1 < totalDistance2 ? totalDistance1 : totalDistance2;
    
    // Convert total distance to kilometers
    const totalDistanceKm = (totalDistance / 1000).toFixed(2);

    if (totalDistance1 < totalDistance2) {
        sortedClients = [client1Coordinates, client2Coordinates];
        message = `Você deverá visitar primeiro ${client1Name} e depois ${client2Name} numa distância total de ${totalDistanceKm} km`;
    } else {
        sortedClients = [client2Coordinates, client1Coordinates];
        message = `Você deverá visitar primeiro ${client2Name} e depois ${client1Name} numa distância total de ${totalDistanceKm} km`;
    }

    return {
        route: sortedClients,
        totalDistance: totalDistanceKm,
        message
    };
}


// Function to calculate the optimal route between the company and all customers
function calRouteAllClients(companyCoordinates, clientCoordinatesList) {
    if (!companyCoordinates || !clientCoordinatesList || clientCoordinatesList.length < 1) {
        throw new Error('As coordenadas da empresa e dos clientes devem ser fornecidas');
    }

    // Array to store distances between points
    const distances = [];

    // Calculate distances between the company and all clients
    for (const clientCoordinates of clientCoordinatesList) {
        const distance = calDistance(companyCoordinates, clientCoordinates);
        distances.push({ clientCoordinates, distance });
    }

    // Sort distances in ascending order
    distances.sort((a, b) => a.distance - b.distance);

    // Build the route passing through all clients
    let totalDistance = 0;
    let route = [{ name: "Empresa", ...companyCoordinates }];
    for (const { clientCoordinates } of distances) {
        route.push(clientCoordinates);
        totalDistance += calDistance(route[route.length - 2], clientCoordinates);
    }
    // Return to the company
    route.push({ name: "Empresa", ...companyCoordinates });
    totalDistance += calDistance(route[route.length - 2], route[0]);

    //Convert KM 
    const totalDistanceKm = (totalDistance / 1000).toFixed(2);

    // Construct the message with the visitation order of the clients and the total distance traveled
    let message = `Você deverá visitar: `;
    for (let i = 1; i < route.length - 1; i++) {
        message += `${route[i].name}`;
        if (i < route.length - 2) {
            message += ', ';
        }
    }
    message += `, e então retornar para a empresa Cleaning-Company. A distância total percorrida será de ${totalDistanceKm} km.`;

    return {
        route,
        totalDistance: totalDistanceKm,
        message
    };
}




module.exports = { calRouteExcellent, calRouteAllClients };

