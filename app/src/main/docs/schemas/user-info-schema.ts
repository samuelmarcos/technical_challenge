export const userInfoSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    access_token: {
      type: 'string'
    }

  },
  required: ['name', 'email', 'password', 'id']
}
