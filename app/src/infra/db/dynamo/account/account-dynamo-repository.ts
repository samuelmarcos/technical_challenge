import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAcessTokenRepository } from "@/data/protocols/db/account";
import { LoadConfig } from '@/configuration/load-environment'
import { AccountModel, AddAccountParams } from "@/domain/model";
import { DynamoDB, PutItemCommandInput, UpdateItemCommandInput, GetItemCommandInput, AttributeValue } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { randomUUID } from 'crypto'

export class AccountDynamoRepository implements LoadAccountByEmailRepository, AddAccountRepository, UpdateAcessTokenRepository {

  constructor(private readonly dynamoDb: DynamoDB, private readonly config = LoadConfig.getInstance().getInveronments() ) { }

  public async updateAccessToken(email: string, token: string): Promise<void> {
    try {
      const updateCommand: UpdateItemCommandInput = {
        TableName: this.config.TABLE_NAME,
        Key: marshall({ "email" : email }),
        UpdateExpression: "set #access_token = :access_token",
        ExpressionAttributeValues: {":access_token" : { S: token }},
        ExpressionAttributeNames: {
          "#access_token": 'access_token'
      },
      }
  
      await this.dynamoDb.updateItem(updateCommand)
    } catch(err: any) {
      console.log('err :', err)
    }
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
    const getCommand: GetItemCommandInput = {
      TableName: this.config.TABLE_NAME,
      Key: marshall({
        "email": email
      })
    }
    const { Item } = await this.dynamoDb.getItem(getCommand)

    if(!Item) return null
    
    return unmarshall(Item) as AccountModel
  }
}