import { SignupController } from '@/presentation/controller/login/signup/signup-controller'
import { mockValidation } from '@/tests/mocks/validation/index'
import { Controller, Validation } from '@/presentation/protocols'
import { mockSignupHttpRequest } from '@/tests/mocks/http'
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http-helpers'
import { mockAddAccount } from '@/tests/mocks/presentation'
import { AddAccount } from '../mocks/domain/usecases/add-account'
import { mockAuthentication } from '@/tests/mocks/domain/usecases'
import { Authentication } from '@/domain/usecases/account/authenctication'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  addAccountStub: AddAccount
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addAccountStub = mockAddAccount()
  const authenticationStub = mockAuthentication()
  const sut = new SignupController(validationStub, addAccountStub, authenticationStub)

  return { sut, validationStub, addAccountStub, authenticationStub }
}

describe('SignupController tests', () => {
  test('should call AddAccount with correct email', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(mockSignupHttpRequest())
    expect(addSpy).toHaveBeenCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
    })
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(new Error()))})
    const httpResponse = await sut.handle(mockSignupHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_stack')))
  })

  test('should return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise((resolve)=> resolve(null)))
    const httpResponse = await sut.handle(mockSignupHttpRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

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

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignupHttpRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token'}))
  })

  test('should call athentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockSignupHttpRequest())
    expect(authSpy).toHaveBeenLastCalledWith({ email: 'any_email@email.com', password: 'any_password' })
  })
})