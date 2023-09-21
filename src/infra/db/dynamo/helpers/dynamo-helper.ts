import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { LoadConfig } from '@/configuration/load-environment'

const config = LoadConfig.getInstance().getInveronments()

export const DynamoHelper = {

  getClient(): DynamoDB {
    const client = new DynamoDB({
      region: config.REGION || 'us-east-1'
    })
    return client
  } 
}