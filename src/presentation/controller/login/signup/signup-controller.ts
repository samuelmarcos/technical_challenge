import { badRequest, serverError } from "@/presentation/helpers/http-helpers";
import { Controller, HttpRequest, HttpResponse, Validation } from "@/presentation/protocols";
import { AddAccount, AddAccountParams } from "@/tests/mocks/domain/usecases/add-account";

export class SignupController implements Controller {

  constructor(private readonly validator: Validation,
              private readonly addAccount: AddAccount) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {
      const error: any = this.validator.validate(httpRequest.body)

      if(error) return badRequest(error)

      const { name, email, password }: AddAccountParams = httpRequest.body

      await this.addAccount.add({ name, email, password })

      return Promise.resolve({
        statusCode: 200,
        body: {}
      })

    } catch (error: any) {
      return serverError(error)
    }
  }
  
}