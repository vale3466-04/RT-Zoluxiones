const AWS = require('aws-sdk');

class Dynamodb {
    constructor(){
        if(!Dynamodb.instance){
            Dynamodb.client = new AWS.DynamoDB.DocumentClient();
        }
    }

    static getInstance(){
        Dynamodb.instance = new Dynamodb();
        return Dynamodb.client;
    }
}

module.exports = Dynamodb;