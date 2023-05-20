export interface Crypto {
  generateSalt(): Promise<string>
}
