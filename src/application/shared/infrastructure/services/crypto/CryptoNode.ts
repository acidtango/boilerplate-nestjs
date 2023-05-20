import * as crypto from 'crypto'
import { Crypto } from '../../../domain/services/Crypto'

export class CryptoNode implements Crypto {
  async generateSalt(): Promise<string> {
    return crypto.randomBytes(16).toString('hex')
  }
}
