import { Controller, GetUserInfo, Validation  } from '@/presentation/controller/info/user/user-info-controller-protocols'
import { UserInfoController } from '@/presentation/controller/info/user/user-info-controller'
import { mockValidation } from '@/tests/mocks/validation'
import { mockgetUserInfo } from '../mocks/presentation'
import { mockGetInfoHttpRequest } from '../mocks/http'
import { serverError } from './helpers/http-helpers'
import { ServerError } from './errors'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  getUserInfoStub: GetUserInfo
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const getUserInfoStub = mockgetUserInfo()
  const sut = new UserInfoController(getUserInfoStub)

  return { sut, validationStub, getUserInfoStub }
}


describe('UserInfoController tests', () => {
  test('should call GetUserInfo with correct email', async () => {
    const { sut, getUserInfoStub } = makeSut()
    const addSpy = jest.spyOn(getUserInfoStub, 'getInfo')
    await sut.handle(mockGetInfoHttpRequest())
    expect(addSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  
})