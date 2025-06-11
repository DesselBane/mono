import { createCircularReferenceReplacer } from './circular-reference-replacer'

describe('circularReferenceReplacer', () => {
  it('should replace recursive values', () => {
    const foo: { bar: unknown } = {
      bar: undefined,
    }
    foo.bar = {
      foo,
    }

    const serialize = () =>
      JSON.stringify({ foo }, createCircularReferenceReplacer())

    expect(serialize).not.toThrow()
    const message = serialize()

    expect(JSON.parse(message)).toMatchObject({
      foo: {
        bar: {
          foo: '<circular Reference removed>',
        },
      },
    })
  })

  it('should call scoped replacer functions', () => {
    const spy = vi.fn()
    const replacer = createCircularReferenceReplacer(spy)

    JSON.stringify({ foo: 'bar' }, replacer)

    expect(spy).toHaveBeenCalled()
  })
})
