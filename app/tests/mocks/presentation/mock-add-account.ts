import { AccountModel } from "@/domain/model/account";
import { AddAccount, AddAccountParams } from "@/domain/usecases/account/add-account";
import { mockAccountModel } from "../domain/mock-account";

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
      async add(accountData: AddAccountParams): Promise<AccountModel> {
          return new Promise(resolve => resolve(mockAccountModel()));
      }
  }
  return new AddAccountStub()
}