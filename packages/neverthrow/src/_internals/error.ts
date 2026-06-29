import type { Result } from '../result'

export type ErrorConfig = {
  withStackTrace: boolean
}

const defaultErrorConfig: ErrorConfig = {
  withStackTrace: false,
}

type NeverThrowError<T, E> = {
  data:
    | {
        type: string
        value: T
      }
    | {
        type: string
        value: E
      }
  message: string
  stack: string | undefined
}

// Custom error object
// Context / discussion: https://github.com/supermacro/neverthrow/pull/215
export const createNeverThrowError = <T, E>(
  message: string,
  result: Result<T, E>,
  config: ErrorConfig = defaultErrorConfig,
): NeverThrowError<T, E> => {
  const data = result.isOk()
    ? { type: 'Ok', value: result.value }
    : { type: 'Err', value: result.error }

  // eslint-disable-next-line unicorn/error-message, unicorn/no-unreadable-new-expression
  const maybeStack = config.withStackTrace ? new Error().stack : undefined

  return {
    data,
    message,
    stack: maybeStack,
  }
}
