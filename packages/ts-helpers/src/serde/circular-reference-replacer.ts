import { noopReplacer } from './types'
import type { ReplacerFunction } from './types'

/**
 * This function creates a replacer function which can be use with JSON.stringify. The created replacer replaces all circular references with the string `<circular Reference removed>`.
 * @param replacer A scoped replacer which should be called in case no circular reference was found
 * @example
 * ```typescript
 *     const foo = {
 *       bar: null,
 *     }
 *     foo.bar = {
 *       foo,
 *     }
 *
 *     const serialize = () => JSON.stringify({ foo }, createCircularReferenceReplacer())
 *
 *     expect(JSON.parse(serialize())).toMatchObject({
 *       foo: {
 *         bar: {
 *           foo: '<circular Reference removed>',
 *         },
 *       },
 *     })
 * ```
 *
 */
export function createCircularReferenceReplacer(
  replacer: ReplacerFunction = noopReplacer,
): ReplacerFunction {
  const cache = new Set()

  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return `<circular Reference removed>`
      }
      cache.add(value)
    }
    return replacer(key, value)
  }
}
