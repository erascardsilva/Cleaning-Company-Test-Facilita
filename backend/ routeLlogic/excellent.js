// Function to calculate the distance between two points
function calDistance(point1, point2) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}


// Function to calculate the optimal route between the company and customers
function calRouteExcelent(Company, clients) {
// Input check: Ensures that Company and clients are valid objects
    if (typeof Company !== 'object' || !Array.isArray(clients)) {
        throw new Error('Company deve ser um objeto e clients deve ser um array');
    }

    // Construction of the distance matrix
    const clientWithCompany = [Company, ...clients];
    const distance = [];

    for (let i = 0; i < clientWithCompany.length; i++) {
        distance[i] = [];
        for (let j = 0; j < clientWithCompany.length; j++) {
            distance[i][j] = calDistance(clientWithCompany[i], clientWithCompany[j]);
        }
    }

    const visited = Array(clientWithCompany.length).fill(false);
    visited[0] = true;
    const routeExcelent = [0];

    // Algoritmo  Caixeiro Viajante
    for (let i = 0; i < clientWithCompany.length - 1; i++) {
        let lowDistance = Infinity;
        let nextClient = -1;
        for (let j = 0; j < clientWithCompany.length; j++) {
            if (!visited[j] && distance[routeExcelent[i]][j] < lowDistance) {
                lowDistance = distance[routeExcelent[i]][j];
                nextClient = j;
            }
        }
        visited[nextClient] = true;
        routeExcelent.push(nextClient);
    }

    return routeExcelent.map(index => clientWithCompany[index]);
}

module.exports = calRouteExcelent;
