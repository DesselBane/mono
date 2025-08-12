import { AssertionError } from '../assertions/assertion-error'

/**
 * Converts a keylike value into string for easy logging
 * @param key The value to be converted
 * @param symbolDefaultValue A default value in case keylike is a symbol without description
 *
 * @example
 *
 * ```typescript
 * function logValueOfObject<TTarget extends object>(target: TTarget, key: keyof TTarget) {
 *   const keyNameError: string = key // Error TS2322: Type string | number | symbol is not assignable to type string
 *   const keyName: string = propertyKeyToString(key) // Works
 *
 *   console.log(`Value of ${keyName} is ${String(target[key])}`)
 * }
 * ```
 */
export function propertyKeyToString(
  key: PropertyKey,
  symbolDefaultValue = 'unknown symbol',
): string {
  switch (typeof key) {
    case 'string': {
      return key
    }
    case 'number': {
      return key.toString()
    }
    case 'symbol': {
      return key.description ?? symbolDefaultValue
    }

    default: {
      throw new AssertionError('Invalid type of keylike', {
        actualValue: typeof key,
        expectedValue: 'string | symbol | number',
      })
    }
  }
}
