import { config } from '../../src/config'

const skip = global.describe.skip
const describe = global.describe

const newDescribe = (name: string, cb: () => void | Promise<void>) => {
  if (config.runThirdPartyTests) {
    return describe(name, cb)
  }

  if (name.match('ThirdParty')) {
    return skip(name, cb)
  }

  return describe(name, cb)
}

global.describe = Object.assign(newDescribe, describe)
