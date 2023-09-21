import { AddAccountRepository, LoadAccountByEmailRepository } from "@/data/protocols/db/account";
import { AccountModel, AddAccountParams } from "@/domain/model";
import { DynamoDB, GetItemCommandInput, PutItemCommandInput } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { randomUUID } from 'crypto'

export class AccountDynamoRepository implements LoadAccountByEmailRepository, AddAccountRepository {

  constructor(private readonly dynamoDb: DynamoDB) { }
  public async add(accountData: AddAccountParams): Promise<AccountModel> {

    const id = randomUUID()

    const putCommand:PutItemCommandInput = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { N: id },
        name: {S: accountData.name },
        email: { S: accountData.email },
        password: { S: accountData.password }
      }
    }

    const { Attributes } = await this.dynamoDb.putItem(putCommand)

    return unmarshall(Attributes) as AccountModel
  }


  public async loadByEmail(email: string): Promise<AccountModel> {

    const getCommand: GetItemCommandInput = {
      TableName: process.env.TABLE_NAME,
      Key: {
        ':email': { 'S': email }
      }
    }

    const { Item } = await this.dynamoDb.getItem(getCommand)

    return unmarshall(Item) as AccountModel
  }
}
