import { expectTypeOf, describe, it } from 'vitest'
import { safeTry, safeTryAsync } from './safe-try'

const testFunctionGoodSync: () => string = () => 'test'

const testFunctionGoodAsync: () => Promise<string> = () =>
  Promise.resolve('test')

describe(safeTry, () => {
  describe('array', () => {
    it('has the correct typings', () => {
      const [error, data] = safeTry(testFunctionGoodSync)

      expectTypeOf(error).toBeNullable()
      expectTypeOf(data).toBeNullable()

      if (error == undefined) {
        expectTypeOf(data).not.toBeNullable()
      }
    })
  })

  describe('object', () => {
    it('has the correct typings', () => {
      const { error, data } = safeTry(testFunctionGoodSync)

      expectTypeOf(error).toBeNullable()
      expectTypeOf(data).toBeNullable()

      if (error == undefined) {
        expectTypeOf(data).not.toBeNullable()
      }
    })
  })
})

describe(safeTryAsync, () => {
  describe('generator function', () => {
    describe('array', () => {
      it('has the correct typings', async () => {
        const [error, data] = await safeTryAsync(testFunctionGoodAsync)

        expectTypeOf(error).toBeNullable()
        expectTypeOf(data).toBeNullable()

        if (error == undefined) {
          expectTypeOf(data).not.toBeNullable()
        }
      })
    })

    describe('object', () => {
      it('has the correct typings', async () => {
        const { error, data } = await safeTryAsync(testFunctionGoodAsync)

        expectTypeOf(error).toBeNullable()
        expectTypeOf(data).toBeNullable()

        if (error == undefined) {
          expectTypeOf(data).not.toBeNullable()
        }
      })
    })
  })

  describe('plain promise', () => {
    describe('array', () => {
      it('has the correct typings', async () => {
        const [error, data] = await safeTryAsync(testFunctionGoodAsync())

        expectTypeOf(error).toBeNullable()
        expectTypeOf(data).toBeNullable()

        if (error == undefined) {
          expectTypeOf(data).not.toBeNullable()
        }
      })
    })

    describe('object', () => {
      it('has the correct typings', async () => {
        const { error, data } = await safeTryAsync(testFunctionGoodAsync())

        expectTypeOf(error).toBeNullable()
        expectTypeOf(data).toBeNullable()

        if (error == undefined) {
          expectTypeOf(data).not.toBeNullable()
        }
      })
    })
  })
})
