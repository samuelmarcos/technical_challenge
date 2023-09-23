export interface UpdateAcessTokenRepository {
  updateAccessToken(email: string , token: string): Promise<void>
}