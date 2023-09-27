export const countPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Access'],
    summary: 'API para retornar o número de acessos a um domínio',
    description: 'Essa rota só pode ser executada por qualquer usuário**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/count'
            }
          }
        }
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
