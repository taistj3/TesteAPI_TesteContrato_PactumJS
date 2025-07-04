// const spec = require('pactum').spec;
// const { setBaseUrl } = require('pactum/src/exports/request');

// beforeEach(() => {
//     setBaseUrl('http://lojaebac.ebaconline.art.br');
// });

// it('fazer login com sucesso', async () => {
//     const token = await spec()
//         .post('/public/authUser')
//         .withJson({
//             "email": "admin@admin.com",
//             "password": "admin123"
//         })
//         .expectStatus(200)
//         .returns('data.token')

//     console.log('Authorization Token:', token)
// }); 
// import  gerarToken  from './helpers.js/authHelper.spec';

const { gerarToken } = require('../helpers/authHelper');
describe('Login', () => {
    it('fazer login com sucesso e exibir token', async () => {
        const token = await gerarToken('admin@admin.com', 'admin123')
        console.log('Authorization Token:', token)
        });
    });
