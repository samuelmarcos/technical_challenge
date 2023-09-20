import { AccountModel } from "@/domain/model/account"

export const mockAccountModel = (): AccountModel => {
  return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
  }
}