import { AddCount, Controller, HttpRequest, HttpResponse } from './add-count-controller-protocols'

export class AddCountController implements Controller {

  constructor(private readonly addCount: AddCount) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    await this.addCount.count()

    return Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}