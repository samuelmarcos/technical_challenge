import { User } from '@/domain/model/user';
import { GetUserInfo, LoadAccountByEmailRepository } from './db-get-user-info-protocols';

export class DbGetUserInfo implements GetUserInfo {

  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  
  public async getInfo(email: string): Promise<User> {
    
    await this.loadAccountByEmailRepository.loadByEmail(email)

    return Promise.resolve(null)
  }
  
}