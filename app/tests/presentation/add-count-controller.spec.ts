import { AddCountController } from '@/presentation/controller/count/access/add-count-controller'
import { AddCount, Controller, HttpRequest } from '@/presentation/controller/count/access/add-count-controller-protocols'
import { mockAddCount } from '../mocks/presentation/mock-add-count'
import { ServerError } from '@/presentation/errors'
import { ok, serverError } from '@/presentation/helpers/http-helpers'
import { mockCountModel } from '../mocks/domain/mock-access'

type SutTypes = {
  sut: Controller
  addCountStub: AddCount
}

const mockRequest: HttpRequest  = {

}

const makeSut = (): SutTypes => {
  const addCountStub = mockAddCount()
  const sut = new AddCountController(addCountStub)

  return { sut, addCountStub }
}

describe('AddCountController tests', () => {
  test('should call AddAccount with correct email', async () => {
    const { sut, addCountStub } = makeSut()
    const addSpy = jest.spyOn(addCountStub, 'count')

    await sut.handle(mockRequest)
    expect(addSpy).toHaveBeenCalled()
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addCountStub } = makeSut()
    jest.spyOn(addCountStub, 'count').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(new Error()))})
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError('any_stack')))
  })

})