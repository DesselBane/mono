import type { UnknownRecord } from 'type-fest'
import { propertyKeyToString } from '../objects/property-key-to-string'
import { AssertionError } from './assertion-error'
import type { AssertionContext } from './assertion-error'

export type SetKeysNonNil<
  TOriginal extends UnknownRecord,
  TKeys extends keyof TOriginal,
> = {
  [K in TKeys]-?: Exclude<TOriginal[K], null | undefined>
} & {
  [K in Exclude<keyof TOriginal, TKeys>]: TOriginal[K]
}

/**
 * Checks if the {@link propertiesToCheck} are present on the {@link value}.
 * @throws AssertionError If any of the {@link propertiesToCheck} is `null` or `undefined`
 * @param value The object to check
 * @param propertiesToCheck The properties which must exist
 */
export function assertPropertiesNotNil<
  TValue extends UnknownRecord,
  TKeys extends (keyof TValue)[],
>(
  value: TValue,
  ...propertiesToCheck: TKeys
): asserts value is SetKeysNonNil<TValue, TKeys[number]> {
  for (const property of propertiesToCheck) {
    if (value[property] == undefined) {
      throw new AssertionError(
        `Expected prop ${propertyKeyToString(property)} not to be nil.`,
        {
          actualValue: value,
          expectedValue: 'Values of given keys should not be nil.',
          givenKeys: propertiesToCheck,
        },
      )
    }
  }
}

/**
 * Checks if {@link data} exists.
 * @throws AssertionError If {@link data} is `null` or `undefined`
 * @param data The value to check.
 * @param message A custom message for the error
 * @param assertionContext Custom information about the assertion site
 */
export function assertNotNil<TValue>(
  data: TValue,
  message = `Data was nil`,
  assertionContext?: AssertionContext,
): asserts data is Exclude<TValue, null | undefined> {
  if (data == undefined) {
    assertionContext ??= {
      actualValue: data,
      expectedValue: 'Not null and not undefined',
    }

    throw new AssertionError(message, assertionContext)
  }
}

/**
 * Checks if {@link value} is `null | undefined`
 * @param value The value to check
 * @param message A custom message for the error
 * @param context A custom context for the error
 */
export function assertNil(
  value: unknown,
  message = `Expected data to be null or undefined`,
  context?: AssertionContext,
): asserts value is null | undefined {
  if (value != undefined) {
    context ??= {
      expectedValue: 'Null or Undefined',
      actualValue: value,
    }

    throw new AssertionError(message, context)
  }
}
