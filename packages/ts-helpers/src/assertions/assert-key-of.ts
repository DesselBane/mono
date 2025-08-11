import { keylikeToString } from '../objects/keylike-to-string'
import type { KeyLike } from '../objects/keylike-to-string'
import { AssertionError } from './assertion-error'

export function isKeyOf<TObject extends object>(
  data: TObject,
  key: KeyLike,
): key is keyof TObject {
  return key in data
}

export function assertKeyOf<TObject extends object>(
  data: TObject,
  key: KeyLike,
): asserts key is keyof TObject {
  if (!isKeyOf(data, key)) {
    throw new AssertionError(`"${keylikeToString(key)}" is not a key of data`, {
      data,
      key,
    })
  }
}
