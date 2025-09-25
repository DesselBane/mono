import { safeTry, safeTryAsync } from './safe-try'

const testFunctionBadSync: () => void = () => {
  throw new Error('test error')
}
const testFunctionGoodSync: () => string = () => 'test'

// Async is only to provoke an async function to test the implementation
// eslint-disable-next-line @typescript-eslint/require-await
const testFunctionBadAsync: () => Promise<void> = async () => {
  throw new Error(`test error`)
}
const testFunctionGoodAsync: () => Promise<string> = () =>
  Promise.resolve('test')

describe(safeTry, () => {
  it('should not throw', () => {
    expect(() => safeTry(testFunctionBadSync)).not.toThrow()
  })

  describe('array', () => {
    it('should catch and return a thrown error', () => {
      const [error] = safeTry(testFunctionBadSync)

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('test error')
    })

    it('should return the data if no error is thrown', () => {
      const [, data] = safeTry(testFunctionGoodSync)

      expect(data).toBe('test')
    })
  })

  describe('object', () => {
    it('should catch and return a thrown error', () => {
      const { error } = safeTry(testFunctionBadSync)

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('test error')
    })

    it('should return the data if no error is thrown', () => {
      const { data } = safeTry(testFunctionGoodSync)

      expect(data).toBe('test')
    })
  })
})

describe(safeTryAsync, () => {
  it('should not throw', async () => {
    await expect(
      safeTryAsync(() => testFunctionBadAsync()),
    ).resolves.not.toThrow()

    await expect(safeTryAsync(testFunctionBadAsync())).resolves.not.toThrow()

    describe('generator function', () => {
      describe('array', () => {
        it('should catch and return a thrown error', async () => {
          const [error] = await safeTryAsync(testFunctionBadAsync)

          expect(error).toBeInstanceOf(Error)
          expect(error?.message).toBe('test error')
        })

        it('should return the data if no error is thrown', async () => {
          const [, data] = await safeTryAsync(testFunctionGoodAsync)

          expect(data).toBe('test')
        })
      })

      describe('object', () => {
        it('should catch and return a thrown error', async () => {
          const { error } = await safeTryAsync(testFunctionBadAsync)

          expect(error).toBeInstanceOf(Error)
          expect(error?.message).toBe('test error')
        })

        it('should return the data if no error is thrown', async () => {
          const { data } = await safeTryAsync(testFunctionGoodAsync)

          expect(data).toBe('test')
        })
      })
    })

    describe('plain promise', () => {
      describe('array', () => {
        it('should catch and return a thrown error', async () => {
          const [error] = await safeTryAsync(testFunctionBadAsync())

          expect(error).toBeInstanceOf(Error)
          expect(error?.message).toBe('test error')
        })

        it('should return the data if no error is thrown', async () => {
          const [, data] = await safeTryAsync(testFunctionGoodAsync())

          expect(data).toBe('test')
        })
      })

      describe('object', () => {
        it('should catch and return a thrown error', async () => {
          const { error } = await safeTryAsync(testFunctionBadAsync())

          expect(error).toBeInstanceOf(Error)
          expect(error?.message).toBe('test error')
        })

        it('should return the data if no error is thrown', async () => {
          const { data } = await safeTryAsync(testFunctionGoodAsync())

          expect(data).toBe('test')
        })
      })
    })
  })
})
