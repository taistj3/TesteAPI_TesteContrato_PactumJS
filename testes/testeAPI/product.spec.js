const { spec } = require('pactum');
const { setBaseUrl } = require('pactum/src/exports/request');
const { gerarToken } = require('../helpers/authHelper');

before(async () => {
    setBaseUrl('http://lojaebac.ebaconline.art.br');
    token = await gerarToken('admin@admin.com', 'admin123');

});

it('Deve adicionar produto com sucesso', async () => {
    const res = await spec()
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

it('Deve editar produto com sucesso', async () => {
    await spec()
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

it('Deve excluir produto com sucesso', async () => {
    await spec()
        .delete(`/api/deleteProduct/${categoriaId}`)
        .withHeaders('Authorization', `${token}`)
        .expectStatus(200);
}); 