import { User } from "@/domain/model/user";
import { GetUserInfo } from "@/domain/usecases/info/get-user-info";
import { mockAccountModel } from "../domain/mock-account";

export const mockgetUserInfo = (): GetUserInfo => {
  class GetUserInfoStub implements GetUserInfo {
      async getInfo(email: string): Promise<User> {
          return new Promise(resolve => resolve(mockAccountModel()));
      }
  }
  return new GetUserInfoStub()
}