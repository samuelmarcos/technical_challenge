import { badRequest } from "@/presentation/helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";

export class SignupController implements Controller {

  constructor(private readonly validator: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    const error: any = this.validator.validate(httpRequest.body)

    if(error) return badRequest(error)

    return Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
  
}