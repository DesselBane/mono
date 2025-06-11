/**
 * Ensure that a finally callback is run after a work item without knowing if the work item is a promise or not.
 * @param potentiallyThrowingCallback The callback which might throw and might return a promise
 * @param finallyCallback The cleanup callback to be run after the work item
 *
 * @example
 * ```typescript
 * function wrapper<TInput extends unknown[], TOutput>(
 *   target: (...input: TInput) => TOutput,
 * ): (...input: TInput) => TOutput {
 *   return function (...input: TInput) {
 *     console.log('This is logged before the target is called')
 *     return finallyForMaybePromise(
 *       () => target(...input),
 *       () => {
 *         console.log(
 *           'This is logged after the target completed and if it was a promise it is awaited first',
 *         )
 *       },
 *     )
 *   }
 * }
 * ```
 */
export function finallyForMaybePromise<TData>(
  potentiallyThrowingCallback: () => TData,
  finallyCallback: () => void,
): TData
/**
 * Ensure that a finally callback is run after a work item without knowing if the work item is a promise or not.
 * @param potentiallyThrowingCallback The callback which might throw and might return a promise
 * @param finallyCallback The cleanup callback to be run after the work item
 *
 * @example
 * ```typescript
 * function wrapper<TInput extends unknown[], TOutput>(
 *   target: (...input: TInput) => TOutput,
 * ): (...input: TInput) => TOutput {
 *   return function (...input: TInput) {
 *     console.log('This is logged before the target is called')
 *     return finallyForMaybePromise(
 *       () => target(...input),
 *       () => {
 *         console.log(
 *           'This is logged after the target completed and if it was a promise it is awaited first',
 *         )
 *       },
 *     )
 *   }
 * }
 * ```
 */
export function finallyForMaybePromise<TData>(
  potentiallyThrowingCallback: () => Promise<TData>,
  finallyCallback: () => void,
): Promise<TData>
/**
 * Ensure that a finally callback is run after a work item without knowing if the work item is a promise or not.
 * @param potentiallyThrowingCallback The callback which might throw and might return a promise
 * @param finallyCallback The cleanup callback to be run after the work item
 *
 * @example
 * ```typescript
 * function wrapper<TInput extends unknown[], TOutput>(
 *   target: (...input: TInput) => TOutput,
 * ): (...input: TInput) => TOutput {
 *   return function (...input: TInput) {
 *     console.log('This is logged before the target is called')
 *     return finallyForMaybePromise(
 *       () => target(...input),
 *       () => {
 *         console.log(
 *           'This is logged after the target completed and if it was a promise it is awaited first',
 *         )
 *       },
 *     )
 *   }
 * }
 * ```
 */
export function finallyForMaybePromise<TData>(
  potentiallyThrowingCallback: (() => TData) | (() => Promise<TData>),
  finallyCallback: () => void,
): TData | Promise<TData> {
  try {
    const result = potentiallyThrowingCallback()

    if (result instanceof Promise) {
      return result.finally(finallyCallback)
    }

    finallyCallback()
    return result
  } catch (error) {
    finallyCallback()
    throw error
  }
}
