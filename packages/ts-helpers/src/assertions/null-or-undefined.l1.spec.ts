/* eslint-disable unicorn/no-null,unicorn/no-useless-undefined */
import { describe, expect, expectTypeOf } from 'vitest'
import {
  assertNotNil,
  assertPropertiesNotNil as assertPropertiesNotNil,
  assertNil,
} from './null-or-undefined'
import { AssertionError } from './assertion-error'

describe('assert', () => {
  describe('assertPropsNotNil', () => {
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
      }).toThrowError(AssertionError)
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
      }).not.toThrowError(AssertionError)
    })

    // Skipped as this test only tests types
    it.skip('should mark props as safe when they are not null', () => {
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

  describe('assertNotNil', () => {
    it('should throw if null is passed', () => {
      expect(() => {
        assertNotNil(null)
      }).toThrowError(AssertionError)
    })

    it('should throw if undefined is passed', () => {
      expect(() => {
        assertNotNil(undefined)
      }).toThrowError(AssertionError)
    })

    it.each(['', 0, -0, 0n, Number.NaN, false])(
      'should not throw if falsy value is passed: %s',
      (falsyValue) => {
        expect(() => {
          assertNotNil(falsyValue)
        }).not.toThrowError(AssertionError)
      },
    )

    it('should have message and context if it was passed', () => {
      expect(() => {
        assertNotNil(undefined, 'Foobar', { customTestContext: 'foobar' })
      }).toThrowError(
        expect.objectContaining({
          name: 'AssertionError',
          message: 'Foobar',
          context: {
            customTestContext: 'foobar',
          },
        }),
      )
    })

    // Skipped as this test only tests types
    it.skip('should correctly assert type', () => {
      const foo = 'bar' as unknown as string | null

      expectTypeOf(foo).toEqualTypeOf<string | null>()

      assertNotNil(foo)

      expectTypeOf(foo).toBeString()
    })
  })

  describe('assertNil', () => {
    it('should not throw if null is passed', () => {
      expect(() => {
        assertNil(null)
      }).not.toThrowError(AssertionError)
    })

    it('should not throw if undefined is passed', () => {
      expect(() => {
        assertNil(undefined)
      }).not.toThrowError(AssertionError)
    })

    it.each(['', 0, -0, 0n, Number.NaN, false])(
      'should throw if falsy but non nullish value is passed: %s',
      (falsyValue) => {
        expect(() => {
          assertNil(falsyValue)
        }).toThrowError(AssertionError)
      },
    )

    it('should have message and context if it was passed', () => {
      expect(() => {
        assertNil('not nil', 'Foobar', { customTestContext: 'foobar' })
      }).toThrowError(
        expect.objectContaining({
          name: 'AssertionError',
          message: 'Foobar',
          context: {
            customTestContext: 'foobar',
          },
        }),
      )
    })

    // Skipped as this test only tests types
    it.skip('should correctly assert type', () => {
      const foo = null as unknown as string | null

      expectTypeOf(foo).toEqualTypeOf<string | null>()

      assertNil(foo)

      expectTypeOf(foo).toBeNullable()
    })
  })
})
