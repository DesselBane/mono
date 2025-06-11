/* eslint-disable unicorn/no-null */
import { describe, expect, expectTypeOf } from 'vitest'
import {
  isNilOrWhitespace,
  assertIsString,
  assertIsNullableString,
} from './strings'
import type { Nullable } from './strings'

describe('strings', () => {
  describe('isNilOrWhitespace', () => {
    it.each([
      {
        input: '',
        expectedResult: true,
      },
      {
        input: '  ',
        expectedResult: true,
      },
      {
        input: null,
        expectedResult: true,
      },
      {
        input: undefined,
        expectedResult: true,
      },
      {
        // Non-breakable space is still just a space
        input: '\u00A0',
        expectedResult: true,
      },
      {
        input: 'f',
        expectedResult: false,
      },
    ])(
      `should return $expectedResult for $input`,
      ({ input, expectedResult }) => {
        expect(isNilOrWhitespace(input)).toBe(expectedResult)
      },
    )
  })

  describe('assertIsString', () => {
    it.each([
      {
        title: 'null',
        value: null,
      },
      {
        title: 'undefined',
        value: undefined,
      },
      {
        title: 'number',
        value: 3,
      },
      {
        title: 'boolean',
        value: true,
      },
      {
        title: 'object',
        value: { foo: true },
      },
      {
        title: 'array',
        value: [''],
      },
    ])('should throw for $title', ({ value }) => {
      expect(() => {
        assertIsString(value)
      }).toThrow()
    })

    it('should not throw for strings', () => {
      const value = 'test' as unknown as string | number

      expect(() => {
        assertIsString(value)
      }).not.toThrow()

      assertIsString(value)

      expectTypeOf(value).toBeString()
    })

    it('should throw correct error', () => {
      expect(() => {
        assertIsString(3)
      }).toThrowError(
        expect.objectContaining({
          name: 'AssertionError',
          message: 'Expected value to be string',
          context: {
            expectedType: 'string',
            actualType: 'number',
          },
        }),
      )
    })
  })

  describe('assertIsNullableString', () => {
    it.each([
      {
        title: 'number',
        value: 3,
      },
      {
        title: 'boolean',
        value: true,
      },
      {
        title: 'object',
        value: { foo: true },
      },
      {
        title: 'array',
        value: [''],
      },
    ])('should throw for $title', ({ value }) => {
      expect(() => {
        assertIsNullableString(value)
      }).toThrow()
    })

    it.each([
      {
        title: 'null',
        value: null,
      },
      {
        title: 'undefined',
        value: undefined,
      },
      {
        title: 'string',
        value: 'foo',
      },
    ])('should not throw for $title', ({ value }) => {
      expect(() => {
        assertIsNullableString(value)
      }).not.toThrow()
    })

    it.skip('should assert the type correctly', () => {
      const value = 'test' as unknown as Nullable<string> | number

      assertIsNullableString(value)

      expectTypeOf(value).toExtend<Nullable<string>>()
    })

    it('should throw correct error', () => {
      expect(() => {
        assertIsNullableString(3)
      }).toThrowError(
        expect.objectContaining({
          name: 'AssertionError',
          message: 'Expected value to be string | null | undefined',
          context: {
            expectedType: 'string | null | undefined',
            actualType: 'number',
            actualValue: 3,
          },
        }),
      )
    })
  })
})
