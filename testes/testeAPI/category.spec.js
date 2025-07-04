const { spec } = require('pactum');
const { setBaseUrl } = require('pactum/src/exports/request');
const { gerarToken } = require('../helpers/authHelper');

before(async () => {
  setBaseUrl('http://lojaebac.ebaconline.art.br');
  token = await gerarToken('admin@admin.com', 'admin123');

});

it('Deve adicionar categoria com sucesso', async () => {
  const res = await spec()
    .post('/api/addCategory')
    .withHeaders('Authorization', `${token}`)
    .withJson({
      "name": "bag da pandoraa",
      "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
    })
    .expectStatus(200);
    
    categoriaId = res.body.data._id;
    console.log('Categoria adicionada com sucesso, ID:', categoriaId);
    });

it('Deve editar categoria com sucesso', async () => {
  await spec()
    .put(`/api/editCategory/${categoriaId}`)
    .withHeaders('Authorization', `${token}`)
    .withJson({
      "authorization": `${token}`,
      "name": "bag da Charlotte",
      "photo": "https://genietravel.com/collections/all?srsltid=AfmBOoo1BdlMQ_vRRItYwb-i8EIWyuT-a5MI1GGki_CcQrstngQoxJwf"
    })
    .expectStatus(200);
  });

  it('Deve excluir categoria com sucesso', async () => {
    await spec()
      .delete(`/api/deleteCategory/${categoriaId}`)
      .withHeaders('Authorization', `${token}`)
      .expectStatus(200);
  }); 