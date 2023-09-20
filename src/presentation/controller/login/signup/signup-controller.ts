import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";

export class SignupController implements Controller {

  constructor(private readonly validator: Validation) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    this.validator.validate(httpRequest.body)

    return Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
  
}