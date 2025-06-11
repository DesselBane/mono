import { expect } from 'vitest'
import { noop } from '../main'
import { finallyForMaybePromise } from './finally-for-maybe-promise'

describe('finallyForMaybePromise', () => {
  describe('sync', () => {
    it('should call finally without error', () => {
      const finallyMock = vi.fn()

      finallyForMaybePromise(noop, finallyMock)

      expect(finallyMock).toHaveBeenCalledOnce()
    })

    it('should call finally with error', () => {
      const finallyMock = vi.fn()

      expect(() =>
        finallyForMaybePromise(() => {
          throw new Error('test')
        }, finallyMock),
      ).toThrow()

      expect(finallyMock).toHaveBeenCalledOnce()
    })
  })

  describe('async', () => {
    it('should call finally without error', async () => {
      const finallyMock = vi.fn()

      await finallyForMaybePromise(() => Promise.resolve('foo'), finallyMock)

      expect(finallyMock).toHaveBeenCalledOnce()
    })

    it('should call finally with error', async () => {
      const finallyMock = vi.fn()

      await expect(() =>
        finallyForMaybePromise(
          () => Promise.reject(new Error('test')),
          finallyMock,
        ),
      ).rejects.toThrow()

      expect(finallyMock).toHaveBeenCalledOnce()
    })
  })
})
