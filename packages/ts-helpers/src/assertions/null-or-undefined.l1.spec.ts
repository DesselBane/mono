/* eslint-disable unicorn/no-null,unicorn/no-useless-undefined */
import { describe, expect, it } from 'vitest'
import {
  assertNotNil,
  assertPropertiesNotNil,
  assertNil,
} from './null-or-undefined'
import { AssertionError } from './assertion-error'

describe(assertPropertiesNotNil, () => {
  type TypeUnderTest = {
    bar: string | null
    baz: string | undefined
    foo?: string
    quz: string | null
  }

  const defaultData: TypeUnderTest = {
    bar: 'bar',
    foo: 'foo',
    quz: 'quz',
    baz: 'baz',
  }

  it.each<{ title: string; data: TypeUnderTest; prop: keyof TypeUnderTest }>([
    {
      title: 'bar = null',
      data: { ...defaultData, bar: null },
      prop: 'bar',
    },
    {
      title: 'baz = undefined',
      data: { ...defaultData, baz: undefined },
      prop: 'baz',
    },

    {
      title: 'foo = undefined',
      data: { ...defaultData, foo: undefined },
      prop: 'foo',
    },
  ])('should throw if $title', ({ data, prop }) => {
    expect(() => {
      assertPropertiesNotNil(data, prop)
    }).toThrow(AssertionError)
  })

  it.each<{ title: string; data: { foo: unknown } }>([
    {
      title: 'baz = ""',
      data: { foo: '' },
    },
    {
      title: 'foo = 0',
      data: { foo: 0 },
    },
    {
      title: 'foo = -0',
      data: { foo: -0 },
    },
    {
      title: 'foo = NaN',
      data: { foo: Number.NaN },
    },
    {
      title: 'foo = 0 (bigInt)',
      data: { foo: 0n },
    },
    {
      title: 'foo = false',
      data: { foo: false },
    },
  ])('should not throw if $title', ({ data }) => {
    expect(() => {
      assertPropertiesNotNil(data, 'foo')
    }).not.toThrow(AssertionError)
  })
})

describe(assertNotNil, () => {
  it('should throw if null is passed', () => {
    expect(() => {
      assertNotNil(null)
    }).toThrow(AssertionError)
  })

  it('should throw if undefined is passed', () => {
    expect(() => {
      assertNotNil(undefined)
    }).toThrow(AssertionError)
  })

  it.each(['', 0, -0, 0n, Number.NaN, false])(
    'should not throw if falsy value is passed: %s',
    (falsyValue) => {
      expect(() => {
        assertNotNil(falsyValue)
      }).not.toThrow(AssertionError)
    },
  )

  it('should have message and context if it was passed', () => {
    expect(() => {
      assertNotNil(undefined, 'Foobar', { customTestContext: 'foobar' })
    }).toThrow(
      expect.objectContaining({
        name: 'AssertionError',
        message: 'Foobar',
        context: {
          customTestContext: 'foobar',
        },
      }),
    )
  })
})

describe(assertNil, () => {
  it('should not throw if null is passed', () => {
    expect(() => {
      assertNil(null)
    }).not.toThrow(AssertionError)
  })

  it('should not throw if undefined is passed', () => {
    expect(() => {
      assertNil(undefined)
    }).not.toThrow(AssertionError)
  })

  it.each(['', 0, -0, 0n, Number.NaN, false])(
    'should throw if falsy but non nullish value is passed: %s',
    (falsyValue) => {
      expect(() => {
        assertNil(falsyValue)
      }).toThrow(AssertionError)
    },
  )

  it('should have message and context if it was passed', () => {
    expect(() => {
      assertNil('not nil', 'Foobar', { customTestContext: 'foobar' })
    }).toThrow(
      expect.objectContaining({
        name: 'AssertionError',
        message: 'Foobar',
        context: {
          customTestContext: 'foobar',
        },
      }),
    )
  })
})
