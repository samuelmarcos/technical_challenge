import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Stone Technical Challenge - Api para cadastro de contas e manipulação de acesso a domínios',
    description: 'Essa é a documentação da API feita por Samuel Marcos Neto Barbosa, feita em NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Samuel Marcos Neto Barbosa',
      email: 'samuelmarcos9580@gmail.com',
      url: 'https://www.linkedin.com/in/samuelmarcosneto/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: '',
    url: ''
  },
  servers: [{
    url: '/v1',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Count access',
    description: 'APIs relacionadas a contagem de acessos a um domínio'
  }],
  paths,
  schemas,
  components
}
