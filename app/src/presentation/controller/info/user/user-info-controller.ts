import { badRequest, ok, serverError } from '@/presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, GetUserInfo, Validation } from './user-info-controller-protocols'

export class UserInfoController implements Controller {

  constructor(private readonly getUserInfo: GetUserInfo,
              private readonly validator: Validation) {}
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const error: any = await this.validator.validate(httpRequest.params)

      if(error) return badRequest(error)
      
      const userInfo = await this.getUserInfo.getInfo(httpRequest.params.email)
    
      return ok(userInfo)

    } catch (err: any) {
      return serverError(err)
    }
  }
  
}