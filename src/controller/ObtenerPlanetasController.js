const Dynamodb = require('../db/dynamodb/Dynamodb');

const ObtenerPlanetasController = async (event) => {
    
    try{
        const dynamodb = Dynamodb.getInstance();
        const resultadoPlanetas = await dynamodb.scan({
            TableName: 'PlanetTable'
        }).promise();

        const planetas = resultadoPlanetas.Items;

        console.log('Resultados del SCAN: ', planetas);

        return {
            status: 200,
            body: planetas
        }
    }catch(e){
        console.log('Error detectado: ', e);
    }
}

module.exports = {
    ObtenerPlanetasController,
}