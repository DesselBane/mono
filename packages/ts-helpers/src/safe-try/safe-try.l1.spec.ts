import { safeTry } from './safe-try'

const testFunctionBadSync: () => void = () => {
  throw new Error('test error')
}
const testFunctionGoodSync: () => string = () => 'test'

// eslint-disable-next-line @typescript-eslint/require-await
const testFunctionBadAsync: () => Promise<void> = async () => {
  throw new Error(`test error`)
}
const testFunctionGoodAsync: () => Promise<string> = () =>
  Promise.resolve('test')

describe(safeTry, () => {
  describe('sync', () => {
    it('should not throw', () => {
      expect(() => safeTry(testFunctionBadSync)).not.toThrow()
    })

    it('should catch and return a thrown error', () => {
      const { error } = safeTry(testFunctionBadSync)

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('test error')
    })

    it('should return the value if no error is thrown', () => {
      const { value } = safeTry(testFunctionGoodSync)

      expect(value).toBe('test')
    })
  })

  describe('async', () => {
    it('should not throw', async () => {
      await expect(safeTry(() => testFunctionBadAsync())).resolves.not.toThrow()

      await expect(safeTry(testFunctionBadAsync())).resolves.not.toThrow()
    })

    it('should catch and return a thrown error', async () => {
      const { error } = await safeTry(testFunctionBadAsync())

      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe('test error')
    })

    it('should return the value if no error is thrown', async () => {
      const { value } = await safeTry(testFunctionGoodAsync())

      expect(value).toBe('test')
    })
  })
})
