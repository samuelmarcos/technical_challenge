import { CountModel } from "@/domain/model";
import { AccessApiService, HttpRequester } from "./protocols";
import { LoadConfig } from '@/configuration/load-environment'

export class CountApiService implements AccessApiService {

  constructor(private readonly httpRequester: HttpRequester,
      private readonly config = LoadConfig.getInstance().getInveronments()) {}
  public async countTonAccess(): Promise<CountModel> {
    
    const countApiResult = await this.httpRequester.get<CountModel>(this.config.COUNT_ACCESS_URL)

    return countApiResult
  }
}