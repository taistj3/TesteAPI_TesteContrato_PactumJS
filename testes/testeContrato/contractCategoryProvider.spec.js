const { reporter, flow, request, handler } = require('pactum');
const pf = require('pactum-flow-plugin');
const { gerarToken } = require('../../helpers/authHelper');

let token;
let categoriaId;

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'lojaebac_api';
    pf.config.projectName = 'Loja Ebac - API';
    pf.config.version = '1.0.1.1';
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}

before(async () => {
    addFlowReporter();
    request.setBaseUrl('http://lojaebac.ebaconline.art.br');
    token = await gerarToken('admin@admin.com', 'admin123');
});

after(async () => {
    await reporter.end();
});

it('Provider-Deve adicionar categoria com sucesso', async () => {
    handler.addInteractionHandler('Adicionar Categoria_flow', () => {
        return {
            provider: 'Loja Ebac - API',
            flow: 'Adicionar Categoria_flow',
            request: {
                method: 'POST',
                path: '/api/addCategory',
                headers: { 'Authorization': `${token}` },
                body: {
                    "name": "bag da pandoraaa",
                    "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
                }
            },
            response: {
                status: 200,
            }
        };
    });
    const res = await flow('Adicionar Categoria_flow')
        .post('/api/addCategory')
        .withHeaders('Authorization', `${token}`)
        .withJson({
            "name": "bag da pandoraa",
            "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
        })
        .expectStatus(200)
    categoriaId = res.body.data._id;
    console.log('Categoria criada com ID:', categoriaId);
});