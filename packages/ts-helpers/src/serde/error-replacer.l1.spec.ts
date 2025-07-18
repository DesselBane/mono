import { createErrorReplacer } from './error-replacer'
import type { ReplacerFunction } from './types'

describe(createErrorReplacer, () => {
  it('should include name, message, stack and cause in stringified errors', () => {
    const error = new Error('foo', { cause: 'bar' })

    const reparsedError = JSON.parse(
      JSON.stringify(error, createErrorReplacer()),
    )

    expect(reparsedError.name).toBe('Error')
    expect(reparsedError.message).toBe('foo')
    expect(reparsedError.stack.length).toBeGreaterThan(0)
    expect(reparsedError.cause).toBe('bar')
  })

  it('should call scoped replacer functions', () => {
    const spy = vi.fn<ReplacerFunction>()
    const replacer = createErrorReplacer(spy)

    JSON.stringify(new Error('foo'), replacer)

    expect(spy).toHaveBeenCalled()
  })
})
