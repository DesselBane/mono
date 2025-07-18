import { isIncluded } from './is-included'

describe('is-included', () => {
  const data = ['foo', 'bar'] as const

  it('should be false if element is not included', () => {
    expect(isIncluded(data, 'baz')).toBe(false)
  })

  it('should be true if element is included', () => {
    expect(isIncluded(data, 'foo')).toBe(true)
  })

  it('should narrow type if element is included', () => {
    // Ignoring lint rule to make it explicitly obvious that this a string to begin with
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const maybeElement: string = 'foo'

    expect(isIncluded(data, maybeElement)).toBe(true)

    if (isIncluded(data, maybeElement)) {
      expectTypeOf(maybeElement).toEqualTypeOf<'foo' | 'bar'>()
    }
  })

  it('should be possible to check unrelated types', () => {
    // Ignoring lint rule to make it explicitly obvious that this a number to begin with
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const maybeElement: number = 3

    expect(isIncluded(data, maybeElement)).toBe(false)
  })
})
