import 'module-alias'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2  } from 'aws-lambda'
import { makeGetUserController } from '@/main/factories/get-user-info-controller-factorie/get-user-info-controller-factorie'
import { Controller } from '@/presentation/protocols'
import { EventMapper } from '@/main/helpers/event-mapper'

class UserInfoFunction {
  public async main(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const httpRequest = EventMapper.mapEvent(event)
    const controller: Controller = makeGetUserController()

    const response = await controller.handle(httpRequest)

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body)
    }
  }
}

const handler = new UserInfoFunction()


export const userInfoFunction = handler.main.bind(UserInfoFunction)

