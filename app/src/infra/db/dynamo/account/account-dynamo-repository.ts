import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAcessTokenRepository } from "@/data/protocols/db/account";
import { LoadConfig } from '@/configuration/load-environment'
import { AccountModel, AddAccountParams } from "@/domain/model";
import { DynamoDB, GetItemCommandInput, PutItemCommandInput, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { randomUUID } from 'crypto'

export class AccountDynamoRepository implements LoadAccountByEmailRepository, AddAccountRepository, UpdateAcessTokenRepository {

  constructor(private readonly dynamoDb: DynamoDB, private readonly config = LoadConfig.getInstance().getInveronments() ) { }

  public async updateAccessToken(id: string, token: string): Promise<void> {
    const updateCommand: UpdateItemCommandInput = {
      TableName: this.config.TABLE_NAME,
      Key: marshall({ pk: id }),
      UpdateExpression: "set #token = :token",
      ExpressionAttributeNames: {
          "#token": token
      },
      ExpressionAttributeValues: {":token" : { S: token }}
    }

    const { Attributes } = await this.dynamoDb.updateItem(updateCommand)
  }

  public async add(accountData: AddAccountParams): Promise<AccountModel> {

    const id = randomUUID()

    const putCommand:PutItemCommandInput = {
      TableName: this.config.TABLE_NAME,
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
      TableName: this.config.TABLE_NAME,
      Key: {
        ':email': { 'S': email }
      }
    }

    const { Item } = await this.dynamoDb.getItem(getCommand)

    return unmarshall(Item) as AccountModel
  }
}
