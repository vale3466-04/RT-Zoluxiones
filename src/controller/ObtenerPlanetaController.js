const Dynamodb = require('../db/dynamodb/Dynamodb');

const ObtenerPlanetaController = async (event) => {
    const dynamodb = Dynamodb.getInstance();
    const { id } = event.pathParameters;

    try{
        const result = await dynamodb.get({
            TableName: 'PlanetTable',
            Key: {
                id
            }
        }).promise();
    
        const planeta = result.Item;
        if(!planeta) {
            return {
                statusCode: 500,
                body: `El planeta con el id ${id} no existe.`
            }
        }
        return {
            status: 200,
            body: planeta
        }
    }catch(e){
        console.log('Error detectado: ', e);
    }
}

module.exports = {
    ObtenerPlanetaController,
}