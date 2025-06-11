import { AssertionError } from './assertion-error'

export type Nullable<TValue> = TValue | null | undefined

/**
 * Returns true if the value is `null` | `undefined` or a string with only whitespaces
 * @param value The value to test
 */
export function isNilOrWhitespace(value: string | null | undefined) {
  return value == undefined || value.trim().length === 0
}

/**
 * Asserts that a value is of type string
 * @param value The value to test
 */
export function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new AssertionError('Expected value to be string', {
      expectedType: 'string',
      actualType: typeof value,
    })
  }
}

/**
 * Asserts that a value is of type string | null | undefined
 * @param value The value to test
 */
export function assertIsNullableString(
  value: unknown,
): asserts value is Nullable<string> {
  if (value == undefined || typeof value === 'string') {
    return
  }

  throw new AssertionError('Expected value to be string | null | undefined', {
    expectedType: 'string | null | undefined',
    actualType: typeof value,
    actualValue: value,
  })
}
