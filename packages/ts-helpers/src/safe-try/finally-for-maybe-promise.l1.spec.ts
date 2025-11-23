import { vi, describe, it, expect } from 'vitest'
import { noop } from '@desselbane/vitest-helpers'
import { finallyForMaybePromise } from './finally-for-maybe-promise'

describe(finallyForMaybePromise, () => {
  describe('sync', () => {
    it('should call finally without error', () => {
      const finallyMock = vi.fn<VoidFunction>()

      finallyForMaybePromise(noop, finallyMock)

      expect(finallyMock).toHaveBeenCalledTimes(1)
    })

    it('should call finally with error', () => {
      const finallyMock = vi.fn<VoidFunction>()

      expect(() =>
        finallyForMaybePromise(() => {
          throw new Error('test')
        }, finallyMock),
      ).toThrow('test')

      expect(finallyMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('async', () => {
    it('should call finally without error', async () => {
      const finallyMock = vi.fn<VoidFunction>()

      await finallyForMaybePromise(() => Promise.resolve('foo'), finallyMock)

      expect(finallyMock).toHaveBeenCalledTimes(1)
    })

    it('should call finally with error', async () => {
      const finallyMock = vi.fn<VoidFunction>()

      await expect(() =>
        finallyForMaybePromise(
          () => Promise.reject(new Error('test')),
          finallyMock,
        ),
      ).rejects.toThrow('test')

      expect(finallyMock).toHaveBeenCalledTimes(1)
    })
  })
})
