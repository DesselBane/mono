import { lazy } from './lazy'

describe(lazy, () => {
  it('should create the value only once its accessed', () => {
    const spy = vi
      .fn<() => string>()
      .mockReturnValue('ae5fc249-2fc4-47f5-8b75-b7a0a16f3a3e')
    const lazyValueGetter = lazy(spy)

    expect(spy).not.toHaveBeenCalled()

    const lazyValue = lazyValueGetter()

    expect(lazyValue).toBe('ae5fc249-2fc4-47f5-8b75-b7a0a16f3a3e')
    expect(spy).toHaveBeenCalledTimes(1)

    lazyValueGetter()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should only create the value once', () => {
    const spy = vi
      .fn<() => string>()
      .mockReturnValue('ae5fc249-2fc4-47f5-8b75-b7a0a16f3a3e')
    const lazyValueGetter = lazy(spy)

    lazyValueGetter()

    expect(spy).toHaveBeenCalledTimes(1)

    lazyValueGetter()

    expect(spy).toHaveBeenCalledTimes(1)

    lazyValueGetter()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
