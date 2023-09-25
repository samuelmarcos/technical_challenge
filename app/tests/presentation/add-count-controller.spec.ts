import { AddCountController } from '@/presentation/controller/count/access/add-count-controller'
import { AddCount, Controller } from '@/presentation/controller/count/access/add-count-controller-protocols'
import { mockAddCount } from '../mocks/presentation/mock-add-count'
import { mockSignupHttpRequest } from '../mocks/http'

type SutTypes = {
  sut: Controller
  addCountStub: AddCount
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

    await sut.handle(mockSignupHttpRequest())
    expect(addSpy).toHaveBeenCalled()
  })
})