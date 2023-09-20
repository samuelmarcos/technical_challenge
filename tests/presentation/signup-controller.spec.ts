import { SignupController } from '@/presentation/controller/login/signup/signup-controller'
import { mockValidation } from '@/tests/mocks/validation/index'
import { Controller, Validation } from './protocols'
import { mockSignupHttpRequest } from '@/tests/mocks/http'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new SignupController(validationStub)

  return { sut, validationStub }
}

describe('SignupController tests', () => {
  test('shoud call validation correct email', async () => {
    const { sut, validationStub } = makeSut()
    const httpRequest = mockSignupHttpRequest()
    const validationSpied = jest.spyOn(validationStub, 'validate')
    await sut.handle(httpRequest)
    expect(validationSpied).toHaveBeenCalledWith(httpRequest.body)
  })

})