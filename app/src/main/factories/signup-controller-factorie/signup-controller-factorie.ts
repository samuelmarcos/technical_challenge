import { LoadConfig } from '@/configuration/load-environment'
import { DynamoHelper } from '@/infra/db/dynamo/helpers/dynamo-helper'
import { AccountDynamoRepository } from '@/infra/db/dynamo/account/account-dynamo-repository'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { makeSignupValidation } from '@/main/factories/signup-controller-factorie/validation-factorie/signup-validation-facotire'
import { DbAuthentication } from '@/data/usecases/account/authentication/db.authentication'
import { SignupController } from '@/presentation/controller/login/signup/signup-controller'
import {BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adpter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adpter/jwt-adapter'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  const config = LoadConfig.getInstance().getInveronments()
  const client = DynamoHelper.getClient()
  const repository = new AccountDynamoRepository(client)
  const bcryptAdapter = new BcryptAdapter(8)
  const jwtAdapter = new JwtAdapter(config.SECRET)
  const addAccount = new DbAddAccount(repository, bcryptAdapter, repository)
  const authentication = new DbAuthentication(repository, bcryptAdapter, jwtAdapter, repository)
  const validationComposite = makeSignupValidation()

  return new SignupController(validationComposite, addAccount, authentication)
}