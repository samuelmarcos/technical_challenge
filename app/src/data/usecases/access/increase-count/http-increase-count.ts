import { AccessApiService, IncreaseCount } from './http-increase-count.protocols'

export class HttpIncreaseCount implements IncreaseCount {
  constructor(private readonly countService: AccessApiService) {}
  
  public async increase(): Promise<void> {

    await this.countService.increaseCount()

    return Promise.resolve(null)
  }
  
}