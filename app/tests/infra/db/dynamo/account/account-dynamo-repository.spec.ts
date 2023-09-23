import { AccountDynamoRepository } from '@/infra/db/dynamo/account/account-dynamo-repository'
import { DynamoDB, QueryCommandOutput, PutItemCommandOutput, UpdateItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { mockAccountModel, mockAddAccountParams } from '@/tests/mocks/domain/mock-account'

type SutTypes = {
  sut: AccountDynamoRepository
  dynamoDBStub: DynamoDB
}

const emptyQurtyresult: QueryCommandOutput = {
  $metadata: {
    httpStatusCode: 400
  },
  Items: []
}

const failPutItemResult : PutItemCommandOutput = {
  $metadata: {
    httpStatusCode: 400
  },
  Attributes: undefined
}

class DynamoDBStub extends DynamoDB{
  async query(): Promise<QueryCommandOutput> {
    const items = [marshall(mockAccountModel())]
    const result: QueryCommandOutput = {
      $metadata: {

      },
      Items: items
    }
    return result
  }

  async putItem(): Promise<PutItemCommandOutput> {
    const result:PutItemCommandOutput = {
      $metadata: {
        httpStatusCode: 204
      },
      Attributes: marshall(mockAccountModel())

    }

    return result
  }

  async updateItem(): Promise<UpdateItemCommandOutput> {
    const result:UpdateItemCommandOutput = {
      $metadata: {},
      Attributes: marshall(mockAccountModel())
    }

    return result
  }
}

const makeSut = (): SutTypes => {
  const dynamoDBStub = new DynamoDBStub()
  const sut = new AccountDynamoRepository(dynamoDBStub as DynamoDB)

  return { sut, dynamoDBStub }
}

describe('AccountDynamoRepository', () => {
  test('should return an account on loadByEmail success', async () => {
    const { sut }  = makeSut() 
    const account = await sut.loadByEmail("any_email@email.com.br")

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe("any_name")
    expect(account.email).toBe("any_email@email.com")
    expect(account.password).toBe("any_password")
  })

  test('should null if no account is found', async () => {
    const { sut, dynamoDBStub  }  = makeSut()
    jest.spyOn(dynamoDBStub, 'query').mockImplementationOnce(() => Promise.resolve(emptyQurtyresult))
    const account = await sut.loadByEmail("any_email@email.com.br")

    expect(account).toEqual(null)
  })

  test('should save an account on success', async () => {
    const { sut }  = makeSut() 
    const account = await sut.add(mockAddAccountParams())

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe("any_name")
    expect(account.email).toBe("any_email@email.com")
    expect(account.password).toBe("any_password")
  })

  test('should returns null if fail on saving an account', async () => {
    const { sut, dynamoDBStub }  = makeSut() 
    jest.spyOn(dynamoDBStub, 'putItem').mockImplementationOnce(() => {Promise.resolve(failPutItemResult)})
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(null)
  })

  test('should save an account on success', async () => {
    const { sut }  = makeSut() 
    const account = await sut.updateAccessToken('any_id', 'any_token')
    expect(account).toBe(undefined)

  })
})