import { Controller, GetUserInfo, Validation  } from '@/presentation/controller/info/user/user-info-controller-protocols'
import { UserInfoController } from '@/presentation/controller/info/user/user-info-controller'
import { mockValidation } from '@/tests/mocks/validation'
import { mockgetUserInfo } from '../mocks/presentation'
import { mockGetInfoHttpRequest } from '../mocks/http'
import {  badRequest, ok, serverError } from '@/presentation/helpers/http-helpers'
import {  MissingParamError, ServerError } from '@/presentation/errors'
import { mockAccountModel } from '../mocks/domain/mock-account'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  getUserInfoStub: GetUserInfo
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const getUserInfoStub = mockgetUserInfo()
  const sut = new UserInfoController(getUserInfoStub, validationStub)

  return { sut, validationStub, getUserInfoStub }
}


describe('UserInfoController tests', () => {
  test('should call GetUserInfo with correct email', async () => {
    const { sut, getUserInfoStub } = makeSut()
    const addSpy = jest.spyOn(getUserInfoStub, 'getInfo')
    await sut.handle(mockGetInfoHttpRequest())
    expect(addSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, getUserInfoStub } = makeSut()
    jest.spyOn(getUserInfoStub, 'getInfo').mockImplementationOnce(() => { return new Promise((resolve, reject) => reject(new Error()))})
    const httpResponse = await sut.handle(mockGetInfoHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_stack')))
  })

  test('shoud call validation correct email', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpied = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockGetInfoHttpRequest())
    expect(validationSpied).toHaveBeenCalledWith(mockGetInfoHttpRequest().params)
  })

  test('should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => new MissingParamError('any_field'))
    const httResponse = await sut.handle(mockGetInfoHttpRequest())
    expect(httResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockGetInfoHttpRequest())
    expect(httpResponse).toEqual(ok(mockAccountModel()))
  })
})