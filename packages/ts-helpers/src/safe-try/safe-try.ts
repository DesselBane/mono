export type SafeTryReturnError = readonly [Error, undefined] & {
  readonly data: undefined
  readonly error: Error
}

export type SafeTryReturnData<TValue> = readonly [undefined, TValue] & {
  readonly data: TValue
  readonly error: undefined
}

export type SafeTryReturn<TValue> =
  | SafeTryReturnData<TValue>
  | SafeTryReturnError

type IntermediateSafeReturn<TValue> =
  | (readonly [undefined, TValue] & {
      data?: TValue
      error?: undefined
    })
  | (readonly [Error, undefined] & {
      data?: undefined
      error?: Error
    })

function makeErrorSafe(error: unknown) {
  return error instanceof Error
    ? error
    : new Error('Unknown error', { cause: error })
}

function createSafeReturnValue<TValue>(
  error?: Error,
  value?: TValue,
): SafeTryReturn<TValue> {
  if (error === undefined) {
    const returnValue = [undefined, value] as IntermediateSafeReturn<TValue>
    returnValue.error = undefined
    returnValue.data = value

    return returnValue as SafeTryReturn<TValue>
  } else {
    const returnValue = [error, undefined] as IntermediateSafeReturn<TValue>
    returnValue.error = error
    returnValue.data = undefined

    return returnValue as SafeTryReturn<TValue>
  }
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
): SafeTryReturn<TReturn> {
  try {
    const result = maybeThrowingFunction()

    return createSafeReturnValue(undefined, result)
  } catch (error) {
    return createSafeReturnValue(makeErrorSafe(error))
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
  maybeThrowingPromise: (() => Promise<TReturn>) | Promise<TReturn>,
): Promise<SafeTryReturn<TReturn>> {
  try {
    const promise =
      typeof maybeThrowingPromise === 'function'
        ? maybeThrowingPromise()
        : maybeThrowingPromise
    const promiseResult = await promise

    return createSafeReturnValue(undefined, promiseResult)
  } catch (error) {
    return createSafeReturnValue(makeErrorSafe(error))
  }
}
