import { propertyKeyToString } from '../objects/property-key-to-string'
import { AssertionError } from './assertion-error'

export function isKeyOf<TObject extends object>(
  data: TObject,
  key: PropertyKey,
): key is keyof TObject {
  return key in data
}

export function assertKeyOf<TObject extends object>(
  data: TObject,
  key: PropertyKey,
): asserts key is keyof TObject {
  if (!isKeyOf(data, key)) {
    throw new AssertionError(
      `"${propertyKeyToString(key)}" is not a key of data`,
      {
        data,
        key,
      },
    )
  }
}
