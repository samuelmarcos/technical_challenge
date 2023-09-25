import { HttpRequester } from "@/service/count/protocols";

export const mockHttpRequester = (): HttpRequester => {
  class HttpRequesterStub implements HttpRequester {
    get<T>(): Promise<T> {
      return Promise.resolve( {} as T )
    }
  }

  return new HttpRequesterStub()
}