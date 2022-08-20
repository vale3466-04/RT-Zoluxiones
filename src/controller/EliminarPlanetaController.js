const Dynamodb = require('../db/dynamodb/Dynamodb');

const EliminarPlanetaController = async (event) => {
    const dynamodb = Dynamodb.getInstance();    
    const { id } = event.pathParameters;

    try{
        await dynamodb
        .delete({
        TableName: "PlanetTable",
        Key: {
            id,
        },
        })
        .promise();

        return {
        status: 200,
        body: JSON.stringify({
            message: "Planeta eliminado satisfactoriamente",
        })
        };
    }catch(e){
        console.log('Se detecto un error: ', e);
    }
};

module.exports = {
  EliminarPlanetaController,
};