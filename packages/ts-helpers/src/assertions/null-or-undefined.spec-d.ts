/* eslint-disable unicorn/no-null */

import { describe, expectTypeOf, it } from 'vitest'
import {
  assertNil,
  assertNotNil,
  assertPropertiesNotNil,
} from './null-or-undefined'

describe(assertPropertiesNotNil, () => {
  it('should mark props as safe when they are not null', () => {
    const foo: {
      bar: string | null
      baz: string | undefined
      foo?: string
      quz: string | null
    } = {
      bar: 'bar',
      foo: 'foo',
      quz: 'quz',
      baz: 'baz',
    }

    assertPropertiesNotNil(foo, 'bar', 'baz', 'foo')

    expectTypeOf(foo.bar).toEqualTypeOf<string>()
    expectTypeOf(foo.baz).toEqualTypeOf<string>()
    expectTypeOf(foo.foo).toEqualTypeOf<string>()
    expectTypeOf(foo.quz).toEqualTypeOf<null | string>()
  })
})

describe(assertNotNil, () => {
  it('should correctly assert type', () => {
    const foo = 'bar' as unknown as string | null

    expectTypeOf(foo).toEqualTypeOf<string | null>()

    assertNotNil(foo)

    expectTypeOf(foo).toBeString()
  })
})

describe(assertNil, () => {
  it('should correctly assert type', () => {
    const foo = null as unknown as string | null

    expectTypeOf(foo).toEqualTypeOf<string | null>()

    assertNil(foo)

    expectTypeOf(foo).toBeNullable()
  })
})
