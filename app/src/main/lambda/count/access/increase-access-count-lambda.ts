import 'module-alias'
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2  } from 'aws-lambda'
import { Controller } from '@/presentation/protocols'
import { EventMapper } from '@/main/helpers/event-mapper'
import { makeIncreaseCountController } from '@/main/factories/increase-access-count-controller-factorie/increase-access-count-controller-factorie'

class IncreaseCount {
  public async main(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const httpRequest = EventMapper.mapEvent(event)
    const controller: Controller = makeIncreaseCountController()

    const response = await controller.handle(httpRequest)

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body)
    }
  }
}

const handler = new IncreaseCount()


export const increaseAccessCountFunction = handler.main.bind(IncreaseCount)

