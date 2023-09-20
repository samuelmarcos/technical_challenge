import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AccountModel, LoadAccountByEmailRepository, AddAccountParams, AddAccount, AddAccountRepository} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {

  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
              private readonly hasher: Hasher,
              private readonly addAccountRepository: AddAccountRepository) {}

  public async add(accountData: AddAccountParams): Promise<AccountModel> {

    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if(account) return null

    const hashedPassword = await this.hasher.hash(accountData.password)

    const createdAccount = await this.addAccountRepository.add({...accountData, password: hashedPassword})

    return createdAccount
  }
}