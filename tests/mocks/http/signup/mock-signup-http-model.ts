import { HttpRequest } from "@/presentation/protocols";

export const mockSignupHttpRequest = ():HttpRequest => {
  return {
    body: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      password_confirmation: 'any_password',
    }
  }
}