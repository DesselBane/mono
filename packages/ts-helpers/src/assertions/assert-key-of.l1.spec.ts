import { assertKeyOf, isKeyOf } from './assert-key-of'
import { AssertionError } from './assertion-error'

describe(isKeyOf, () => {
  it('should return false if key can not be found', () => {
    const data = {}

    expect(isKeyOf(data, 'missing')).toBe(false)
  })

  it('should return true if key can be found', () => {
    const data: object = { test: '' }

    expect(isKeyOf(data, 'test')).toBe(true)
  })
})

describe(assertKeyOf, () => {
  it('should not throw if key exists', () => {
    const data: object = { test: '' }

    expect(() => {
      assertKeyOf(data, 'test')
    }).not.toThrow()
  })

  it('should throw if key is missing', () => {
    const data = {}

    expect(() => {
      assertKeyOf(data, 'test')
    }).toThrow(AssertionError)
  })

  it('should serialize symbols correctly for the error', () => {
    const data = {}
    const key = Symbol('my symbol')

    expect(() => {
      assertKeyOf(data, key)
    }).toThrowErrorMatchingInlineSnapshot(
      `[AssertionError: "my symbol" is not a key of data]`,
    )
  })

  it('should include data and key in the error', () => {
    const data = {}
    const key = 3

    expect(() => {
      assertKeyOf(data, key)
    }).toThrow(
      expect.objectContaining({
        context: {
          data,
          key,
        },
      }),
    )
  })
})
