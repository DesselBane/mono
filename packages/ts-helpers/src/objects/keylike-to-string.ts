import { AssertionError } from '../assertions/assertion-error'

/**
 * Converts a keylike value into string for easy logging
 * @param keylike The value to be converted
 * @param symbolDefaultValue A default value in case keylike is a symbol without description
 *
 * @example
 *
 * ```typescript
 * function logValueOfObject<TTarget extends object>(target: TTarget, key: keyof TTarget) {
 *   const keyNameError: string = key // Error TS2322: Type string | number | symbol is not assignable to type string
 *   const keyName: string = keylikeToString(key) // Works
 *
 *   console.log(`Value of ${keyName} is ${String(target[key])}`)
 * }
 * ```
 */
export function keylikeToString(
  keylike: string | symbol | number,
  symbolDefaultValue = 'unknown symbol',
): string {
  switch (typeof keylike) {
    case 'string': {
      return keylike
    }
    case 'number': {
      return keylike.toString()
    }
    case 'symbol': {
      return keylike.description ?? symbolDefaultValue
    }

    default: {
      throw new AssertionError('Invalid type of keylike', {
        actualValue: typeof keylike,
        expectedValue: 'string | symbol | number',
      })
    }
  }
}
