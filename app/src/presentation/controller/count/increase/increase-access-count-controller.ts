import { Controller, HttpRequest, HttpResponse, IncreaseCount } from './increase-access-count-controller-protocols'


export class IncreaseAccessCountController implements Controller {

  constructor(private readonly increaseCount: IncreaseCount) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    await this.increaseCount.increase()
    
    return Promise.resolve(null)
  }
  
}