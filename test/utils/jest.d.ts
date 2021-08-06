declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Tests if the given subject is an uuid in any version
       */
      toBeAnUuid(): R
    }
  }
}

export {}
