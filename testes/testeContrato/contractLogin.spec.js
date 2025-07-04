const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
  pf.config.url = 'http://localhost:8080'; // pactum flow server url
  pf.config.projectId = 'lojaebac_front';
  pf.config.projectName = 'Loja Ebac - Front';
  pf.config.version = '1.0.1';
  pf.config.username = 'scanner';
  pf.config.password = 'scanner';
  reporter.add(pf.reporter);
}

// global before
before(async () => {
  addFlowReporter();
});

// global after
after(async () => {
  await reporter.end();
});

describe('Front - deve autenticar usuário com sucesso', () => {
    it('Fazer login com sucesso', async () => {
        await flow("Login-flow")
            .post('http://lojaebac.ebaconline.art.br/public/authUser')
            .withJson({
              "email": 'admin@admin.com', 
              "password": 'admin123'
            })
            .expectStatus(200)
            .expectJson('success', true);
        })
    });
