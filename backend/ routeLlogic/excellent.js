
// Function to calculate the distance between two points   form { d = √((x2 - x1)^2 + (y2 - y1)^2) }
// function calDistance(point1, point2) {
//     const deltaX = point2.longitude - point1.longitude;
//     const deltaY = point2.latitude - point1.latitude;

//     return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
// }

//CORREÇÂO
// Then I realized that the correct calculation would be with the Haversine formula de Haversine
// a=sin 2 (2B1​ )+cos(φ 1 )⋅cos(φ 2 )⋅sin 2 (2B2 )
// d=R⋅c 
// c=2⋅atan2( a, −a )
// a=sin 2 (2B1​ )+cos(φ 1 )⋅cos(φ 2 )⋅sin 2 (2B2 )

function calDistance(point1, point2) {
    const toRadians = (value) => (value * Math.PI) / 180;
    const R = 6371000; // Raio da Terra em metros

    const A1 = toRadians(point1.latitude);
    const A2 = toRadians(point2.latitude);
    const B1 = toRadians(point2.latitude - point1.latitude);
    const B2 = toRadians(point2.longitude - point1.longitude);

    const a = Math.sin(B1 / 2) * Math.sin(B1 / 2) +
              Math.cos(A1) * Math.cos(A2) * Math.sin(B2 / 2) * Math.sin(B2 / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
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
    const totalDistanceKm = (totalDistance / 1000).toFixed(3)
   

    if (totalDistance1 < totalDistance2) {
        sortedClients = [client1Coordinates, client2Coordinates];
        message = `Você deverá visitar primeiro ${client1Name} e depois ${client2Name} numa distância total de ${totalDistanceKm} m`;
    } else {
        sortedClients = [client2Coordinates, client1Coordinates];
        message = `Você deverá visitar primeiro ${client2Name} e depois ${client1Name} numa distância total de ${totalDistanceKm} m`;
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
    const totalDistanceKm = (totalDistance / 1000).toFixed(3);
    

    // Construct the message with the visitation order of the clients and the total distance traveled
    let message = `Você deverá visitar: `;
    for (let i = 1; i < route.length - 1; i++) {
        message += `${route[i].name}`;
        if (i < route.length - 2) {
            message += ', ';
        }
    }
    message += `, e então retornar para a empresa Cleaning-Company. A distância total percorrida será de ${totalDistanceKm} m.`;

    return {
        route,
        totalDistance: totalDistanceKm,
        message
    };
}




module.exports = { calRouteExcellent, calRouteAllClients };

