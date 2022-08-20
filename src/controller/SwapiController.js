const Dynamodb = require('../db/dynamodb/Dynamodb');
const axios = require('axios');
const { v4 } = require('uuid');

const SwapiController = async (event) => {
    const dynamodb = Dynamodb.getInstance();
    const idPlaneta = v4();
    const { id } = event.pathParameters;
    const apiSW = `https://swapi.py4e.com/api/planets/${id}/`;
    const fechaCreacion = new Date();

    try{
        const resultSwapi = await axios.get(apiSW);
        const { name, diameter, climate, population } = resultSwapi.data;

        const nuevoPlanetaSWAPI = {
            id: idPlaneta,
            createdAt: fechaCreacion,
            name_planet: name,
            diameter,
            climate,
            population,
        };

        await dynamodb.put({
            TableName: 'PlanetTable',
            Item: nuevoPlanetaSWAPI,
        })
        .promise()

        return {
            status: 200,
            body: nuevoPlanetaSWAPI,
        }
    }catch(e){
        console.log('Error detectado: ', e);
    }
}

module.exports = {
    SwapiController,
}