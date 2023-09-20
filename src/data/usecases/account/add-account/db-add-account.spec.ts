import { DbAddAccount } from './db-add-account'
import { mockLoadAccountByEmailRepository, mockAddAccountRepository } from '@/tests/mocks/data/db'
import { AddAccount } from './db-add-account-protocols'
import { LoadAccountByEmailRepository, AddAccountRepository } from '@/data/protocols/db/account'
import { mockAccountModel, mockAddAccountParams } from '@/tests/mocks/domain/mock-account'
import { mockHasher } from '@/tests/mocks/data/cryptography/index'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { throwError } from '@/tests/mocks/helpers/test-helper'

type SutTypes = {
  sut: AddAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = ():SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(loadAccountByEmailRepositoryStub, hasherStub, addAccountRepositoryStub)
  return { sut, loadAccountByEmailRepositoryStub, hasherStub, addAccountRepositoryStub }
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

  test('should throw if hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
    const promiseAccount =  sut.add(mockAccountModel())
    await expect(promiseAccount).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenLastCalledWith({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'hashed_password'
    })
  })
})