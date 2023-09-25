
import { DynamoHelper } from '@/infra/db/dynamo/helpers/dynamo-helper'
import { AccountDynamoRepository } from '@/infra/db/dynamo/account/account-dynamo-repository'
import { DbGetUserInfo } from '@/data/usecases/account/get-user-info/db-get-user-info'
import { makeGetUserInfoValidator } from '@/main/factories/get-user-info-controller-factorie/validation-factorie/get-user-info-validation-factorie'
import { UserInfoController } from '@/presentation/controller/info/user/user-info-controller'
import { Controller } from '@/presentation/protocols'

export const makeGetUserController = (): Controller => {
  const client = DynamoHelper.getClient()
  const repository = new AccountDynamoRepository(client)
  const getUserInfo = new DbGetUserInfo(repository)
  const validationComposite = makeGetUserInfoValidator()

  return new UserInfoController(getUserInfo, validationComposite)
}