import { DynamoDBClient, DynamoDB } from '@aws-sdk/client-dynamodb'

export const DynamoHelper = {

  getClient(): DynamoDB {
    const client = new DynamoDB({
      region: process.env.REGION
    })
    return client
  } 
}