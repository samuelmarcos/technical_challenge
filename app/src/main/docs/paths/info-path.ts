export const  infoUpPath = {
  post: {
    tags: ['Login'],
    summary: 'API para retornar informações do cadastro de um usuário',
    description: 'Essa rota pode ser executada por **qualquer usuário**',
    parameters: [{
      in: 'path',
      name: 'email',
      description: 'email referente a um usuário específico',
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
              $ref: '#/schemas/userInfoSchema'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
