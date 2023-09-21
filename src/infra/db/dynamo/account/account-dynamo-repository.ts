import { LoadAccountByEmailRepository } from "@/data/protocols/db/account";
import { AccountModel } from "@/domain/model";
import { DynamoDB, GetItemCommandInput } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

export class AccountDynamoRepository implements LoadAccountByEmailRepository {

  constructor(private readonly dynamoDb: DynamoDB) { }
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
