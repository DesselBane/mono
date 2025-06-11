function makeErrorSafe(error: unknown) {
  return error instanceof Error
    ? error
    : new Error('Unknown error', { cause: error })
}

/**
 * Use this function to catch any error which is thrown in the inner function returned as a tuple. This is very similar the error handling of the golang or rust programming languages.
 * @example
 * ```ts
 * const [error, data] = safeTry(maybeThrowingFunction)
 * if(error != undefined) {
 *   console.error('ups')
 *   return error
 * }
 *
 * doSomethingWith(data)
 * ```
 * @param maybeThrowingFunction The function which might throw an error
 */
export function safeTry<TReturn>(
  maybeThrowingFunction: () => TReturn,
): readonly [undefined, TReturn] | readonly [Error, undefined] {
  try {
    const result = maybeThrowingFunction()

    return [undefined, result] as const
  } catch (error) {
    return [makeErrorSafe(error), undefined] as const
  }
}

/**
 * Use this function to catch any error which is thrown in the inner promise returned as a tuple. This is very similar the error handling of the golang or rust programming languages.
 * @example
 * ```ts
 * const [error, data] = await safeTry(maybeThrowingPromise)
 * if(error != undefined) {
 *   console.error('ups')
 *   return error
 * }
 *
 * doSomethingWith(data)
 * ```
 * @param maybeThrowingPromise The promise which might throw an error
 */
export async function safeTryAsync<TReturn>(
  maybeThrowingPromise: () => Promise<TReturn>,
): Promise<readonly [undefined, TReturn] | readonly [Error, undefined]> {
  try {
    const promiseResult = await maybeThrowingPromise()

    return [undefined, promiseResult] as const
  } catch (error) {
    return [makeErrorSafe(error), undefined] as const
  }
}
