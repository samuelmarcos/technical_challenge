import { DynamoHelper } from '@/infra/db/dynamo/helpers/dynamo-helper'

const sut = DynamoHelper

describe('DynamoHelper', () => {
  test('shoud return a new DynamoClient', () => {
    const client = sut.getClient()
    expect(client).toBeTruthy()
  })
})