import { EmailInUseError } from "@/presentation/errors";
import { badRequest, forbidden, serverError } from "@/presentation/helpers/http-helpers";
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

      const account = await this.addAccount.add({ name, email, password })

      if(!account) return forbidden(new EmailInUseError())

      return Promise.resolve({
        statusCode: 200,
        body: account
      })

    } catch (error: any) {
      return serverError(error)
    }
  }
}