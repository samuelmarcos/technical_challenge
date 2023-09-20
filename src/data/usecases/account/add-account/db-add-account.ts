import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-by-email-repository";
import { AccountModel, AddAccount, AddAccountParams } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {

  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  public async add(account: AddAccountParams): Promise<AccountModel> {

    await this.loadAccountByEmailRepository.loadByEmail(account.email)
    
    return Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      password_confirmation: 'any_password',
    })
  }
}