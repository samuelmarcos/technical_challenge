import { HttpRequest } from "@/presentation/protocols";

export const mockGetInfoHttpRequest = ():HttpRequest => {
  return {
    params: {
      email: 'any_email@email.com'
    }
  }
}