import type { UnknownRecord } from 'type-fest'
import { createValueResult, ErrorResult } from '../result/result'
import type { Result } from '../result/result'

export class UnknownError extends Error {
  constructor(cause: unknown) {
    super('Unknown error. Check cause for details', {
      cause,
    })
    this.name = 'UnknownError'
  }

  toJSON(): UnknownRecord {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
    }
  }

  override toString(): string {
    return JSON.stringify(this)
  }
}

function makeErrorSafe(error: unknown): Error {
  return error instanceof Error ? error : new UnknownError(error)
}

/**
 * Use this function to catch any error which is thrown in a Promise and return it as a Result. This is very similar the error handling of the golang or rust programming languages.
 * @param maybeThrowingPromise The Promise which might throw an error
 * @example
 * ```ts
 * // Async
 *
 * async function mightThrowAsync(): Promise<string> {
 *   return "";
 * }
 *
 * async function doSomethingAsyncSafely() {
 *   const { error, value } = await safeTry(mightThrowAsync());
 *   if (error != undefined) {
 *     console.error("ups");
 *     return error;
 *   }
 *
 *   doSomethingWith(value);
 * }
 * ```
 */
export function safeTry<TValue>(
  maybeThrowingPromise: Promise<TValue>,
): Promise<Result<TValue>>
/**
 * Use this function to catch any error which is thrown in the inner function and return it as a Result. This is very similar the error handling of the golang or rust programming languages.
 * @param maybeThrowingFn The function which might throw an error
 * @example
 * ```ts
 * // Sync
 *
 * function mightThrow(): string {
 *   return "";
 * }
 *
 * function doSomethingSafely() {
 *   const { error, value } = safeTry(mightThrow);
 *   if (error != undefined) {
 *     console.error("ups");
 *     return error;
 *   }
 *
 *   doSomethingWith(value);
 * }
 * ```
 */
export function safeTry<TValue>(maybeThrowingFn: () => TValue): Result<TValue>
/**
 * Use this function to catch any error which is thrown in a Promise or the inner function and return it as a Result. This is very similar the error handling of the golang or rust programming languages.
 * @param maybeThrows The function or Promise which might throw an error
 * @example
 * ```ts
 * // Sync
 *
 * function mightThrow(): string {
 *   return "";
 * }
 *
 * function doSomethingSafely() {
 *   const { error, value } = safeTry(mightThrow);
 *   if (error != undefined) {
 *     console.error("ups");
 *     return error;
 *   }
 *
 *   doSomethingWith(value);
 * }
 *
 * // Async
 *
 * async function mightThrowAsync(): Promise<string> {
 *   return "";
 * }
 *
 * async function doSomethingAsyncSafely() {
 *   const { error, value } = await safeTry(mightThrowAsync());
 *   if (error != undefined) {
 *     console.error("ups");
 *     return error;
 *   }
 *
 *   doSomethingWith(value);
 * }
 * ```
 */
export function safeTry<TValue>(
  maybeThrows: (() => TValue) | (() => Promise<TValue>) | Promise<TValue>,
): Result<TValue> | Promise<Result<TValue>> {
  try {
    const promise =
      typeof maybeThrows === 'function' ? maybeThrows() : maybeThrows

    if (promise instanceof Promise) {
      return promise
        .then((v) => createValueResult(v))
        .catch((error: unknown) => new ErrorResult(makeErrorSafe(error)))
    }

    return createValueResult(promise)
  } catch (error) {
    return new ErrorResult(makeErrorSafe(error))
  }
}
