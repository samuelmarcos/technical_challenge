import { AccountDynamoRepository } from '@/infra/db/dynamo/account/account-dynamo-repository'
import { DynamoDB, GetItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { mockAccountModel } from '@/tests/mocks/domain/mock-account'

type SutTypes = {
  sut: AccountDynamoRepository
}

const partialClient: Partial<DynamoDB> = {
  async getItem(): Promise<GetItemCommandOutput> {
    const result: GetItemCommandOutput = {
      $metadata: {

      },
      Item: marshall(mockAccountModel())
    }
    return result
  }
}

const makeSut = (): SutTypes => {
  const sut = new AccountDynamoRepository(partialClient as DynamoDB)

  return { sut }
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
})