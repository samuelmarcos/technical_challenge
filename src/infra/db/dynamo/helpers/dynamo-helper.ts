import { DynamoDB } from '@aws-sdk/client-dynamodb'

export const DynamoHelper = {

  getClient(): DynamoDB {
    const client = new DynamoDB({
      region: process.env.REGION || 'us-east-1'
    })
    return client
  } 
}