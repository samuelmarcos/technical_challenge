import { IncreaseAccessCountController } from '@/presentation/controller/count/increase/increase-access-count-controller'
import { IncreaseCount , Controller, HttpRequest } from '@/presentation/controller/count/increase/increase-access-count-controller-protocols'
import { mockIncreaseCount } from '@/tests/mocks/presentation/mock-increase-count'
import { ServerError } from '@/presentation/errors'
import { serverError } from '@/presentation/helpers/http-helpers'


type SutTypes = {
  sut: Controller
  increaseCount: IncreaseCount
}

const mockRequest: HttpRequest  = {

}

const makeSut = (): SutTypes => {
  const increaseCount = mockIncreaseCount()
  const sut = new IncreaseAccessCountController(increaseCount)

  return { sut, increaseCount }
}

describe('IncreaseAccessCountController tests', () => {
  test('should call IncreaseCount with correct email', async () => {
    const { sut, increaseCount } = makeSut()
    const increaseSpied = jest.spyOn(increaseCount, 'increase')

    await sut.handle(mockRequest)
    expect(increaseSpied).toHaveBeenCalled()
  })

  test('should return 500 if IncreaseCount throws', async () => {
    const { sut, increaseCount } = makeSut()
    jest.spyOn(increaseCount, 'increase').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(new Error()))})
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('any_stack')))
  })
})