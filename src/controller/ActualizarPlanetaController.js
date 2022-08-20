const Dynamodb = require('../db/dynamodb/Dynamodb');

const ActualizarPlanetaController = async (event) => {
  try{
    const dynamodb = Dynamodb.getInstance();
    const { id } = event.pathParameters;
    const { hecho, nombrePlaneta, diametro, climaPlaneta, poblacion } = JSON.parse(event.body);

    await dynamodb
      .update({
        TableName: "PlanetTable",
        Key: { id },
        UpdateExpression: "set done = :done, name_planet = :name_planet, diameter = :diameter, climate = :climate, population = :population",
        ExpressionAttributeValues: {
          ":done": hecho,
          ":name_planet": nombrePlaneta,
          ":diameter": diametro,
          ":climate": climaPlaneta,
          ":population": poblacion
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      status: 200,
      body: JSON.stringify({
        message: "Planeta actualizado satisfactoriamente",
      }),
    };
  }catch(e){
    console.log('Se detecto el siguiente error: ', e);
  }
};

module.exports = {
  ActualizarPlanetaController,
};