import { CountModel } from "@/domain/model";
import { AccessApiService, HttpRequester } from "./protocols";

export class CountApiService implements AccessApiService {

  constructor(private readonly httpRequester: HttpRequester) {}
  public async countTonAccess(): Promise<CountModel> {
    
    const countApiResult = await this.httpRequester.get<CountModel>()

    return countApiResult
  }
}