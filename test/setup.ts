import * as uuid from 'uuid'

expect.extend({
  toBeAnUuid(str: string) {
    const isValid = uuid.validate(str)

    return {
      message: () => `${str} is not a valid UUID`,
      pass: isValid,
    }
  },
})
