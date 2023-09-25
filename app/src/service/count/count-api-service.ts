import { CountModel } from "@/domain/model";
import { AccessApiService, HttpRequester } from "./protocols";

export class CountApiService implements AccessApiService {

  constructor(private readonly httpRequester: HttpRequester) {}
  public async countTonAccess(): Promise<CountModel> {
    
    await this.httpRequester.get<CountModel>()

    return Promise.resolve({
      value: 123
    })
  }
}