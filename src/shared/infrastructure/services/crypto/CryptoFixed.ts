import { Crypto } from '../../../domain/services/Crypto'

export class CryptoFixed implements Crypto {
  async generateSalt(): Promise<string> {
    return 'salt'
  }
}
