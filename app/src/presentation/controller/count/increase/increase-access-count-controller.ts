import { Controller, HttpRequest, HttpResponse } from './increase-access-count-controller-protocols'


export class IncreaseAccessCountController implements Controller {
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    
    return Promise.resolve(null)
  }
  
}