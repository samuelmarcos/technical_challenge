import { Encrypter } from "@/data/protocols/cryptography/encrypter";
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter {
    constructor(private readonly secret: string) {}

    public async encrypt(value: string ): Promise<string> {
        return await jwt.sign({id: value}, this.secret)   
    }
}