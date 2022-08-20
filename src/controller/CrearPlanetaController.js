const { v4 } = require('uuid');
const Dynamodb = require('../db/dynamodb/Dynamodb');
const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');

const CrearPlanetaController = async (event) => {
    try{
        const dynamodb = Dynamodb.getInstance();
        const fechaCreacion = new Date();
        const id = v4();
        console.log('cuerpoBody', event.body);
        const { nombrePlaneta, diametro, climaPlaneta, poblacion } = event.body;
        if(!nombrePlaneta) {
            return {
                status: 400,
                body: JSON.stringify({
                    message: "Body inclompleto",
                })
            }
        }

        const nuevoPlaneta = {
            id,
            createdAt: fechaCreacion,
            name_planet: nombrePlaneta,
            diameter: diametro,
            climate: climaPlaneta,
            population: poblacion,
        } 
        await dynamodb.put({
            TableName: 'PlanetTable',
            Item: nuevoPlaneta,
        })
        .promise();
    
        return {
            status: 200,
            body: nuevoPlaneta,
        }
    }catch(e){
        console.log('Se detecto un error al crear el elemento: ', e);
    }
};

module.exports = {
    CrearPlanetaController: middy(CrearPlanetaController).use(jsonBodyParser()),
}