import {
  Authentication,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAcessTokenRepository,
  HashCompare,
  AthenticationParams,
} from './db.authentication.protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
  ) {}

  async auth(authentication: AthenticationParams): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashCompare.compare(
        authentication.password,
        account!.password
      );
      if (isValid) {
        const acess_token = await this.encrypter.encrypt(account.id);
        await this.updateAcessTokenRepository.updateAccessToken(
          account.id,
          acess_token
        );
        return acess_token;
      }
    }
    return null;
  }
}
