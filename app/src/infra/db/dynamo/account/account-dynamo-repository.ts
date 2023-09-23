import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAcessTokenRepository } from "@/data/protocols/db/account";
import { LoadConfig } from '@/configuration/load-environment'
import { AccountModel, AddAccountParams } from "@/domain/model";
import { DynamoDB, PutItemCommandInput, UpdateItemCommandInput, QueryCommandInput, QueryCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { randomUUID } from 'crypto'

export class AccountDynamoRepository implements LoadAccountByEmailRepository, AddAccountRepository, UpdateAcessTokenRepository {

  constructor(private readonly dynamoDb: DynamoDB, private readonly config = LoadConfig.getInstance().getInveronments() ) { }

  public async updateAccessToken(email: string, token: string): Promise<void> {
    const updateCommand: UpdateItemCommandInput = {
      TableName: this.config.TABLE_NAME,
      Key: marshall({ email : email }),
      UpdateExpression: "set #token = :token",
      ExpressionAttributeNames: {
          "#token": token
      },
      ExpressionAttributeValues: {":token" : { S: token }}
    }

    await this.dynamoDb.updateItem(updateCommand)
  }

  public async add(accountData: AddAccountParams): Promise<AccountModel> {

    const id = randomUUID()
      
    const putCommand:PutItemCommandInput = {
      TableName: this.config.TABLE_NAME,
      Item: {
        "id": { S : id },
        "name": {S: accountData.name },
        "email": { S: accountData.email },
        "password": { S: accountData.password }
      }
    }

    const putResponse = await this.dynamoDb.putItem(putCommand)

    if (putResponse) {
      return {
        id: id,
        ...accountData
      }
    }

    return null
  }


  public async loadByEmail(email: string): Promise<AccountModel> {
    const querCommand: QueryCommandInput = {
      TableName: this.config.TABLE_NAME,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    }

    const { Items } = await this.dynamoDb.query(querCommand)

    if(Items.length === 0) return null

    return unmarshall(Items[0]) as AccountModel
  }
}
