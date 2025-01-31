import type { Crypto } from '../../../domain/services/Crypto.ts'

export class CryptoFixed implements Crypto {
  async generateSalt(): Promise<string> {
    return 'salt'
  }
}
