const request = require('supertest');

describe('Testing API-Planet', () => {
    describe('GET /planet/:id', () => {
        test('Should respond with a 200 status code', async () => {
            try{
                const response = await request('https://dsw0kj2orl.execute-api.us-west-2.amazonaws.com').get('/planet/c140fd11-aa81-423a-86df-00c3437e565a').send();
                expect(response.statusCode).toBe(200);
            }catch(e){
                console.log('Error: ', e);
            }
        });
        test('Should body is a object', async () => {
            try{
                const response = await request('https://dsw0kj2orl.execute-api.us-west-2.amazonaws.com').get('/planet/c140fd11-aa81-423a-86df-00c3437e565a').send();
            expect(typeof response.body).toBe('object');
            }catch(e){
                console.log('Error: ', e);
            }
        });
    });
});k