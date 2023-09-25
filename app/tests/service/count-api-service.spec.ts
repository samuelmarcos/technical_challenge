import { AccessApiService, HttpRequester } from '@/service/count/protocols'
import { CountApiService } from '@/service/count/count-api-service'
import { mockHttpRequester } from '../mocks/services/mock-http-requester'
import { throwError } from '../mocks/helpers/test-helper'

type SutTypes = {
  sut: AccessApiService
  httpRequesterStub: HttpRequester
}

const makeSut = (): SutTypes => {
  const httpRequesterStub = mockHttpRequester()
  const sut = new CountApiService(httpRequesterStub)
  return { sut, httpRequesterStub }
}
 
describe('CountApiService', () => {
  test('shoud call HttpRequester', async () => {
    const { sut, httpRequesterStub } = makeSut()
    const httpSpied = jest.spyOn(httpRequesterStub, 'get')
    await sut.countTonAccess()
    expect(httpSpied).toHaveBeenCalled()
  })

  test('should return 500 if HttpRequester throws', async () => {
    const { sut, httpRequesterStub } = makeSut()
    jest.spyOn(httpRequesterStub, 'get').mockImplementationOnce(throwError)
    const promiseAccount =  sut.countTonAccess()
    await expect(promiseAccount).rejects.toThrow()
  })
})