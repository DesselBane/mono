import { describe, expectTypeOf, it } from 'vitest'
import { assertIsNullableString } from './strings'
import type { Nullable } from './strings'

describe(assertIsNullableString, () => {
  it('should assert the type correctly', () => {
    const value = 'test' as unknown as Nullable<string> | number

    assertIsNullableString(value)

    expectTypeOf(value).toExtend<Nullable<string>>()
  })
})
