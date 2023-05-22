import { sleep } from '../../src/shared/infrastructure/utils/sleep'

/**
 * This function tries to mimic the behavior of
 * [React Testing library `waitFor`](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor)
 * function. This is very useful when asserting async methods that uses event emitters
 * @param cb
 * @param options
 */
export async function waitFor<T>(cb: () => Promise<T>, { timeout = 1000 } = {}) {
  let passedMs = 0
  let error = new Error('Unknown') as unknown

  while (passedMs < timeout) {
    try {
      return await cb()
    } catch (e) {
      error = e
      await sleep(50)
      passedMs += 50
    }
  }

  throw error
}
