const { spec } = require('pactum');
const { setBaseUrl } = require('pactum/src/exports/request');

setBaseUrl('http://lojaebac.ebaconline.art.br');

async function gerarToken(email, senha) {
  const token = await spec()
    .post('/public/authUser')
    .withJson({
      email: email,
      password: senha
    })
    .expectStatus(200)
    .returns('data.token');

  return token;
}

module.exports = { gerarToken };
