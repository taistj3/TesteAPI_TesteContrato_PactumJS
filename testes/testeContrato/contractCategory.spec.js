const { reporter, flow, request} = require('pactum');
const pf = require('pactum-flow-plugin');
const { gerarToken } = require('../../helpers/authHelper');

let token;
let categoriaId;

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'lojaebac_front';
    pf.config.projectName = 'Loja Ebac - Front';
    pf.config.version = '1.0.1.2';
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

it('Front-Deve adicionar categoria com sucesso', async () => {
    const res = await flow('Adicionar Categoria_flow')
        .post('/api/addCategory')
        .withHeaders('Authorization', `${token}`)
        .withJson({
            "name": "bag da pandoraa",
            "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
        })
        .expectStatus(200)
        .expectBodyContains('category added');
    categoriaId = res.body.data._id;
    console.log('Categoria criada com ID:', categoriaId);
});

it('Front-Deve editar categoria com sucesso', async () => {
    await flow('Editar Categoria_flow')
        .put(`/api/editCategory/${categoriaId}`)
        .withHeaders('Authorization', `${token}`)
        .withJson({
            "authorization": `${token}`,
            "name": "bag da Charlotte",
            "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
        })
        .expectStatus(200)
        .expectBodyContains('category updated');
});

it('Front - Deve excluir categoria com sucesso', async () => {
    await flow('Excluir Categoria_flow')
        .delete(`/api/deleteCategory/${categoriaId}`)
        .withHeaders('Authorization', `${token}`)
        .expectStatus(200)
        .expectBodyContains('category deleted');
}); 