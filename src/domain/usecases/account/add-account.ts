import { AccountModel } from '@/domain/model/account'

export type AddAccountParams = {
    name: string
    email: string
    password: string
}

export interface AddAccount {
    add(accountData: AddAccountParams): Promise<AccountModel | null>
}