export const increasePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API para incrementar o número de acessos a um site em 1',
    description: 'Essa rota pode ser usada por qualquer usuário**',
    parameters: [{
      in: 'path',
      name: 'surveyId',
      description: 'ID da enquete a ser respondida',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/increaseCountResult'
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
