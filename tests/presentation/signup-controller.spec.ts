import { SignupController } from '@/presentation/controller/login/signup/signup-controller'
import { mockValidation } from '@/tests/mocks/validation/index'
import { Controller, Validation } from '@/presentation/protocols'
import { mockSignupHttpRequest } from '@/tests/mocks/http'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helpers'

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
    const validationSpied = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockSignupHttpRequest())
    expect(validationSpied).toHaveBeenCalledWith(mockSignupHttpRequest().body)
  })

  test('should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => new MissingParamError('any_field'))
    const httResponse = await sut.handle(mockSignupHttpRequest())
    expect(httResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})