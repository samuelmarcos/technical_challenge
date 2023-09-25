import { AxiosHelper } from '@/infra/http/helper/axios-helper'
import { CountApiService } from '@/service/count/count-api-service'
import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { HttpIncreaseCount } from '@/data/usecases/access/increase-count/http-increase-count'
import { IncreaseAccessCountController } from '@/presentation/controller/count/increase/increase-access-count-controller'
import { Controller } from '@/presentation/protocols'

export const makeIncreaseCountController = (): Controller => {
  const hhtRequester = new AxiosAdapter(AxiosHelper.getInstance())
  const countApiService = new CountApiService(hhtRequester)
  const increaseCount = new HttpIncreaseCount(countApiService)

  return new IncreaseAccessCountController(increaseCount)
}