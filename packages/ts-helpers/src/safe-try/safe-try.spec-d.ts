import { expectTypeOf, describe, it } from 'vitest'
import { safeTry } from './safe-try'

const testFunctionGoodSync: () => string = () => 'test'

describe(safeTry, () => {
  describe('object', () => {
    it('has the correct typings', () => {
      const { error, value } = safeTry(testFunctionGoodSync)

      expectTypeOf(error).toBeNullable()
      expectTypeOf(value).toBeNullable()

      if (error == undefined) {
        expectTypeOf(value).not.toBeNullable()
      }
    })
  })
})
