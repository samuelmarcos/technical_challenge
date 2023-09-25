import { AxiosAdapter } from '@/infra/http/axios-adapter'
import { HttpRequester } from '@/service/count/protocols'
import { mockAxiosInstance } from '@/tests/mocks/helpers/mock-axios'
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
})