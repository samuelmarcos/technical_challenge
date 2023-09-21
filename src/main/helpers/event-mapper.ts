import { HttpRequest } from '@/presentation/protocols'
import { APIGatewayProxyEventV2  } from 'aws-lambda'

export const EventMapper = {
  mapEvent(event: APIGatewayProxyEventV2): HttpRequest {
    const body = JSON.parse(event.body)
    const { headers, pathParameters  } = event

    const request = { body, headers, params: pathParameters }
    return request
  }
}