import { AccessApiService, HttpRequester } from '@/service/count/protocols'
import { CountApiService } from '@/service/count/count-api-service'
import { mockHttpRequester } from '@/tests/mocks/services/mock-http-requester'
import { throwError } from '@/tests/mocks/helpers/test-helper'
import { mockCountModel } from '@/tests/mocks/domain/mock-access'

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

  test('should return a access count in success', async () => {
    const { sut, httpRequesterStub } = makeSut()
    jest.spyOn(httpRequesterStub,'get').mockReturnValueOnce(new Promise((resolve)=>{resolve(mockCountModel())}))
    const account = await sut.countTonAccess()
    expect(account).toEqual(mockCountModel())
  })
})