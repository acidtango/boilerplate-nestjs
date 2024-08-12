import { describe, it } from 'node:test'
import { expect } from 'expect'
import { CryptoNode } from './CryptoNode.ts'

describe('CryptoNode', () => {
  it('generate a random salt', async () => {
    const cryptoNode = new CryptoNode()

    const salt1 = await cryptoNode.generateSalt()
    const salt2 = await cryptoNode.generateSalt()

    expect(salt1).not.toBe(salt2)
  })
})
