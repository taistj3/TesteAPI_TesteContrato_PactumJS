const { reporter, flow, request} = require('pactum');
const pf = require('pactum-flow-plugin');
const { gerarToken } = require('../../helpers/authHelper');

let token;
let categoriaId;

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'lojaebac_product_front';
    pf.config.projectName = 'Loja Ebac Product - Front';
    pf.config.version = '1.0.1.4';
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
    if (reporter && reporter.end) {
    await reporter.end().catch(err => {
        console.warn('Erro ao finalizar reporter:', err.message);
    });
    }
});

it('Front - Deve adicionar produto com sucesso', async () => {
    const res = await flow('Adicionar produto_flow')
        .post('/api/addProduct')
        .withHeaders('Authorization', `${token}`)
        .withJson({
            "name": "bag pandora",
            "price": 159.90,
            "quantity": 10,
            "categories": "6866d7d634eedf57ec9971bd",
            "description": "bolsa minimalista",
            "photos": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf",
            "popular": true,
            "visible": true,
            "location": "SP",
            "additionalDetails": "Excelente bolsa para o dia a dia",
            "specialPrice": 99.90
        })
        .expectStatus(200);

    categoriaId = res.body.data._id;
    console.log('Produto adicionado com sucesso, ID:', categoriaId);
});

it('Front - Deve editar produto com sucesso', async () => {
    await flow('Editar produto_flow')
        .put(`/api/editProduct/${categoriaId}`)
        .withHeaders('Authorization', `${token}`)
        .withJson({
            "name": "bag Charlotte",
            "price": 159.90,
            "quantity": 10,
            "categories": "6866d7d634eedf57ec9971bd",
            "description": "bolsa minimalista",
            "photos": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf",
            "popular": true,
            "visible": true,
            "location": "SP",
            "additionalDetails": "Excelente bolsa para o dia a dia",
            "specialPrice": 99.90
        })
        .expectStatus(200);
});

it('Front - Deve excluir produto com sucesso', async () => {
    await flow('Excluir produto_flow')
        .delete(`/api/deleteProduct/${categoriaId}`)
        .withHeaders('Authorization', `${token}`)
        .expectStatus(200);
}); 