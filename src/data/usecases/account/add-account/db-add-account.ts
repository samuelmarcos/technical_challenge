import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AccountModel, LoadAccountByEmailRepository, AddAccountParams, AddAccount} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {

  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
              private readonly hasher: Hasher) {}

  public async add(accountData: AddAccountParams): Promise<AccountModel> {

    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if(account) return null

    await this.hasher.hash(accountData.password)

    return Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
      password_confirmation: 'any_password',
    })
  }
}