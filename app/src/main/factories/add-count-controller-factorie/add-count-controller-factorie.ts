import { AxiosHelper } from '@/infra/http/helper/axios-helper'
import { CountApiService } from '@/service/count/count-api-service'
import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { HttpAddCount } from '@/data/usecases/access/add-count/http-add-count'
import { AddCountController } from '@/presentation/controller/count/access/add-count-controller'
import { Controller } from '@/presentation/protocols'

export const makeUserInfoController = (): Controller => {
  const hhtRequester = new AxiosAdapter(AxiosHelper.getInstance())
  const countApiService = new CountApiService(hhtRequester)
  const addCount = new HttpAddCount(countApiService)

  return new AddCountController(addCount)
}