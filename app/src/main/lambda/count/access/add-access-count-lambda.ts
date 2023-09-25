import 'module-alias'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2  } from 'aws-lambda'
import { Controller } from '@/presentation/protocols'
import { EventMapper } from '@/main/helpers/event-mapper'
import { makeUserInfoController } from '@/main/factories/add-count-controller-factorie/add-count-controller-factorie'

class AddAccessCount {
  public async main(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const httpRequest = EventMapper.mapEvent(event)
    const controller: Controller = makeUserInfoController()

    const response = await controller.handle(httpRequest)

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body)
    }
  }
}

const handler = new AddAccessCount()


export const addAccessCountFunction = handler.main.bind(AddAccessCount)

