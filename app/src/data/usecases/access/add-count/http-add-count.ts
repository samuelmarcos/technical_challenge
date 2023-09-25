import { CountApiService } from '@/service/count/protocols/count-api'
import { CountModel, AddCount } from './http-add-count-protocols'

export class HttpAddCount implements AddCount {

  constructor(private readonly countService: CountApiService) {}

  public async count(): Promise<CountModel> {
    
    const countResult = await this.countService.countTonAccess()

    return countResult
  }
}