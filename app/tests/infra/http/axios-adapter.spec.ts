import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { HttpRequester } from '@/service/count/protocols'
import { mockAxiosInstance } from '@/tests/mocks/helpers/mock-axios'
import { throwError } from '@/tests/mocks/helpers/test-helper'
import { AxiosInstance } from 'axios'

type SutTypes = {
  sut: HttpRequester
  axiosInstanceStub: AxiosInstance
}

const makeSut = (): SutTypes => {
  const axiosInstanceStub= mockAxiosInstance() as AxiosInstance
  const sut = new AxiosAdapter(axiosInstanceStub)

  return { sut, axiosInstanceStub }
}

describe('AxiosAdapter tests', () => {
  test('shoud call a axios instance', async () => {
    const { sut, axiosInstanceStub } = makeSut()
    const axiosInstanceSpied = jest.spyOn(axiosInstanceStub, 'get')
    await sut.get('any_url')
    expect(axiosInstanceSpied).toHaveBeenCalled()
  })

  test('should return 500 if axios instance throws', async () => {
    const { sut, axiosInstanceStub } = makeSut()
    jest.spyOn(axiosInstanceStub, 'get').mockImplementationOnce(throwError)
    const promiseAccount =  sut.get('any_url')
    await expect(promiseAccount).rejects.toThrow()
  })
})