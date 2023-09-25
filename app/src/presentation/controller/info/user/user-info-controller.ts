import { serverError } from '@/presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, GetUserInfo, Validation } from './user-info-controller-protocols'

export class UserInfoController implements Controller {

  constructor(private readonly getUserInfo: GetUserInfo,
              private readonly validator: Validation) {}
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      await this.validator.validate(httpRequest.params)
      
      await this.getUserInfo.getInfo(httpRequest.params.email)
    
      return Promise.resolve({
        statusCode: 200,
        body: {}
      })
    } catch (err: any) {
      return serverError(err)
    }
  }
  
}
