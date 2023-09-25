import { User } from "@/domain/model/user";

export interface GetUserInfo {
  getInfo(email: string): Promise<User>
}