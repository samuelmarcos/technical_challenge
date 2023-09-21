import { DynamoHelper } from '@/infra/db/dynamo/helpers/dynamo-helper'
import { AccountDynamoRepository } from '@/infra/db/dynamo/account/account-dynamo-repository'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adpter'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { makeSignupValidation } from '@/main/factories/signup-controller-factorie/validation-factorie/signup-validation-facotire'
import {} from '@/data/usecases/account/add-account/'
import { SignupController } from '@/presentation/controller/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  const client = DynamoHelper.getClient()
  const repository = new AccountDynamoRepository(client)
  const bcryptAdapter = new BcryptAdapter(8)
  const addAccount = new DbAddAccount(repository, bcryptAdapter, repository)
  const validationComposite = makeSignupValidation()

  return new SignupController(validationComposite, addAccount)
}