import { noopReplacer } from './types'
import type { ReplacerFunction } from './types'

/**
 * This function replaces Error objects with plain objects that contain the `name`, `message`, `stack` and `cause` properties of the error otherwise Error objects will be stringified as `{}`.
 * @param replacer A scoped replacer which should be called in case no circular reference was found.
 * @example
 * ```typescript
 *  const reparsedError = JSON.parse(JSON.stringify(error, createErrorReplacer()))
 *
 *  expect(reparsedError.name).toBe('Error')
 *  expect(reparsedError.message).toBe('foo')
 *  expect(reparsedError.stack.length).toBeGreaterThan(0)
 *  expect(reparsedError.cause).toBe('bar')
 * ```
 */
export function createErrorReplacer(
  replacer: ReplacerFunction = noopReplacer,
): ReplacerFunction {
  return (key: string, value: unknown) => {
    if (value instanceof Error && !('toJSON' in value)) {
      return {
        name: value.name,
        message: value.message,
        stack: value.stack,
        cause: value.cause,
      }
    }
    return replacer(key, value)
  }
}
