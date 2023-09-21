import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adpter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}))

const salt = 12
const makeSut = () => {
    return  new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
    describe('hash()', () => {
        test('should call hash with correct value', async () => {
            const sut  = makeSut()
            const hashSpy = jest.spyOn(bcrypt, 'hash')
            await sut.hash('any_value')
            expect(hashSpy).toHaveBeenLastCalledWith('any_value', salt)
        })
    
        test('should return a valid hash on hash success', async () => {
            const sut  = makeSut()
        
            const hashedValue = await sut.hash('any_value')
            expect(hashedValue).toBe('hash')
        })
    })
})