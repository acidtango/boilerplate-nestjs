import { CryptoNode } from './CryptoNode'

describe('CryptoNode', () => {
  it('generate a random salt', async () => {
    const cryptoNode = new CryptoNode()

    const salt1 = await cryptoNode.generateSalt()
    const salt2 = await cryptoNode.generateSalt()

    expect(salt1).not.toBe(salt2)
  })
})
