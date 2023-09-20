import { AddAccount, AddAccountParams, Authentication, Controller, HttpRequest, HttpResponse, Validation} from './signup-controller-protocols'
import { EmailInUseError } from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers/http-helpers";

export class SignupController implements Controller {

  constructor(private readonly validator: Validation,
              private readonly addAccount: AddAccount,
              private readonly authenticator: Authentication) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {
      const error: any = this.validator.validate(httpRequest.body)

      if(error) return badRequest(error)

      const { name, email, password }: AddAccountParams = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })

      if(!account) return forbidden(new EmailInUseError())

      const accessToken = await this.authenticator.auth({ email, password })

      return ok({ accessToken })

    } catch (error: any) {
      return serverError(error)
    }
  }
}