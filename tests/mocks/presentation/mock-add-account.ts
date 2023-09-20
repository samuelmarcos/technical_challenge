import { AccountModel } from "@/domain/model/account";
import { AddAccount, AddAccountParams } from "../domain/usecases/add-account";
import { mockAccountModel } from "../domain/mock-account";

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
      async add(account: AddAccountParams): Promise<AccountModel> {
          return new Promise(resolve => resolve(mockAccountModel()));
      }
  }
  return new AddAccountStub()
}