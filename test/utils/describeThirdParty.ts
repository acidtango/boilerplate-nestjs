import { config } from '../../src/config'

export const describeThirdParty = (name: string, cb: () => void | Promise<void>) => {
  return config.runThirdPartyTests ? describe(name, cb) : describe.skip(name, cb)
}
