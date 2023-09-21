import 'module-alias'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2  } from 'aws-lambda'
import { makeSignupController } from '@/main/factories/signup-controller-factorie/signup-controller-factorie'
import { Controller } from '@/presentation/protocols'
import { EventMapper } from '@/main/helpers/event-mapper'

export const signupFunction = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const httpRequest = EventMapper.mapEvent(event)
  const controller: Controller = makeSignupController()

  const response = await controller.handle(httpRequest)

  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body)
  }
}