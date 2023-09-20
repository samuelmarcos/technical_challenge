import { DbAddAccount } from './db-add-account'
import { mockLoadAccountByEmailRepository } from '@/tests/mocks/data/db'
import { AddAccount } from './db-add-account-protocols'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { mockAccountModel, mockAddAccountParams } from '@/tests/mocks/domain/mock-account'
import { mockHasher } from '@/tests/mocks/data/cryptography/index'
import { Hasher } from '@/data/protocols/cryptography/hasher'

type SutTypes = {
  sut: AddAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
}

const makeSut = ():SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(loadAccountByEmailRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub, hasherStub }
}

describe('DbAddAccount tests', () => {
  test('should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub,'loadByEmail').mockReturnValueOnce(new Promise((resolve)=>{resolve(mockAccountModel())}))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBe(null)
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const {sut, loadAccountByEmailRepositoryStub} = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenLastCalledWith('any_email@email.com')
  })

  test('should call Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(encryptSpy).toHaveBeenLastCalledWith('any_password')
})
})