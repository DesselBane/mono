/**
 * Creates a promise which waits for the specified amount of milliseconds before it resolves
 * @param timeInMs Time in milliseconds to wait
 *
 * @example
 * ```typescript
 * it('should wait 10ms', async () => {
 *   await waitAsync(10)
 * })
 * ```
 */
export function waitAsync(timeInMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeInMs)
  })
}
