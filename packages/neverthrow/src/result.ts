/* eslint-disable unicorn/prefer-await */
import type { ErrorConfig } from './_internals/error'
import { createNeverThrowError } from './_internals/error'
import type {
  ExtractErrTypes,
  ExtractOkTypes,
  InferAsyncErrTypes,
  InferErrTypes,
  InferOkTypes,
} from './_internals/utils'
import {
  combineResultList,
  combineResultListWithAllErrors,
} from './_internals/utils'
import { errAsync, ResultAsync } from './'

/**
  Wraps a function with a try catch, creating a new function with the same
  arguments but returning `Ok` if successful, `Err` if the function throws

  @param fn function to wrap with ok on success or err on failure
*/
export function fromThrowable<TReturn, TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => Result<TReturn, unknown>

/**
  Wraps a function with a try catch, creating a new function with the same
  arguments but returning `Ok` if successful, `Err` if the function throws

  @param fn function to wrap with ok on success or err on failure
  @param errorFn when an error is thrown, this will wrap the error result if provided
*/
export function fromThrowable<
  TReturn,
  TArgs extends readonly unknown[],
  TError,
>(
  fn: (...args: TArgs) => TReturn,
  errorFn: (error: unknown) => TError,
): (...args: TArgs) => Result<TReturn, TError>

export function fromThrowable<
  TReturn,
  TArgs extends readonly unknown[],
  TError,
>(
  ...args:
    | [(...args: TArgs) => TReturn]
    | [(...args: TArgs) => TReturn, (error: unknown) => TError]
):
  | ((...args: TArgs) => Result<TReturn, TError>)
  | ((...args: TArgs) => Result<TReturn, unknown>) {
  const [fn, errorFn] = args

  return (...args) => {
    try {
      const result = fn(...args)
      return ok(result)
    } catch (error) {
      return err(errorFn?.(error) ?? error)
    }
  }
}

export function combine<
  TResultList extends readonly [
    Result<unknown, unknown>,
    ...Result<unknown, unknown>[],
  ],
>(resultList: TResultList): CombineResults<TResultList>

export function combine<
  TResultList extends readonly Result<unknown, unknown>[],
>(resultList: TResultList): CombineResults<TResultList>

export function combine<
  TResultList extends readonly [
    Result<unknown, unknown>,
    ...Result<unknown, unknown>[],
  ],
>(resultList: TResultList): CombineResults<TResultList> {
  return combineResultList(resultList) as CombineResults<TResultList>
}

export function combineWithAllErrors<
  TResultList extends readonly [
    Result<unknown, unknown>,
    ...Result<unknown, unknown>[],
  ],
>(resultList: TResultList): CombineResultsWithAllErrorsArray<TResultList>

export function combineWithAllErrors<
  TResultList extends readonly Result<unknown, unknown>[],
>(resultList: TResultList): CombineResultsWithAllErrorsArray<TResultList>

export function combineWithAllErrors<
  TResultList extends readonly Result<unknown, unknown>[],
>(resultList: TResultList): CombineResultsWithAllErrorsArray<TResultList> {
  return combineResultListWithAllErrors(
    resultList,
    // TODO remove cast
  ) as CombineResultsWithAllErrorsArray<TResultList>
}

export type Result<TOk, TErr> = Ok<TOk, TErr> | Err<TOk, TErr>

export function ok<TOk, TErr = never>(value: TOk): Ok<TOk, TErr>
export function ok<TErr = never>(value: void): Ok<void, TErr>
export function ok<TOk, TErr = never>(value: TOk): Ok<TOk, TErr> {
  return new Ok(value)
}

export function err<TOk = never, TErr extends string = string>(
  err: TErr,
): Err<TOk, TErr>
export function err<TOk = never, TErr = unknown>(err: TErr): Err<TOk, TErr>
export function err<TOk = never>(err: void): Err<TOk, void>
export function err<TOk = never, E = unknown>(err: E): Err<TOk, E> {
  return new Err(err)
}

/**
Evaluates the given generator to a Result returned or an Err yielded from it,
whichever comes first.

This function is intended to emulate Rust's ? operator.
See `/tests/safeTry.test.ts` for examples.

@param body - What is evaluated. In body, `yield* result` works as
Rust's `result?` expression.
@returns The first occurrence of either an yielded Err or a returned Result.
*/
export function safeTry<TOk, TErr>(
  body: () => Generator<Err<never, TErr>, Result<TOk, TErr>>,
): Result<TOk, TErr>

export function safeTry<
  TYieldErr extends Err<never, unknown>,
  TGeneratorReturnResult extends Result<unknown, unknown>,
>(
  body: () => Generator<TYieldErr, TGeneratorReturnResult>,
): Result<
  InferOkTypes<TGeneratorReturnResult>,
  InferErrTypes<TYieldErr> | InferErrTypes<TGeneratorReturnResult>
>

/**
Evaluates the given generator to a Result returned or an Err yielded from it,
whichever comes first.

This function is intended to emulate Rust's ? operator.
See `/tests/safeTry.test.ts` for examples.

@param body - What is evaluated. In body, `yield* result` and
`yield* resultAsync` work as Rust's `result?` expression.
@returns The first occurrence of either an yielded Err or a returned Result.
*/
export function safeTry<TOk, TErr>(
  body: () => AsyncGenerator<Err<never, TErr>, Result<TOk, TErr>>,
): ResultAsync<TOk, TErr>

export function safeTry<
  TYieldErr extends Err<never, unknown>,
  TGeneratorReturnResult extends Result<unknown, unknown>,
>(
  body: () => AsyncGenerator<TYieldErr, TGeneratorReturnResult>,
): ResultAsync<
  InferOkTypes<TGeneratorReturnResult>,
  InferErrTypes<TYieldErr> | InferErrTypes<TGeneratorReturnResult>
>

export function safeTry<TOk, TErr>(
  body:
    | (() => Generator<Err<never, TErr>, Result<TOk, TErr>>)
    | (() => AsyncGenerator<Err<never, TErr>, Result<TOk, TErr>>),
): Result<TOk, TErr> | ResultAsync<TOk, TErr> {
  const n = body().next()
  if (n instanceof Promise) {
    return new ResultAsync(n.then((r) => r.value))
  }
  return n.value
}

type IResult<TOk, TErr> = {
  /**
  Used to check if a `Result` is an `OK`

  @returns `true` if the result is an `OK` variant of Result
  */
  isOk(): this is Ok<TOk, TErr>

  /**
  Used to check if a `Result` is an `Err`

  @returns `true` if the result is an `Err` variant of Result
  */
  isErr(): this is Err<TOk, TErr>

  /**
  Maps a `Result<T, E>` to `Result<U, E>`
  by applying a function to a contained `Ok` value, leaving an `Err` value
  untouched.

  @param mapperFn The function to apply an `OK` value
  @returns the result of applying `f` or an `Err` untouched
  */
  map<TNewOk>(mapperFn: (value: TOk) => TNewOk): Result<TNewOk, TErr>

  /**
  Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a
  contained `Err` value, leaving an `Ok` value untouched.

  This function can be used to pass through a successful result while
  handling an error.

  @param mapperFn a function to apply to the error `Err` value
  */
  mapErr<TNewErr>(mapperFn: (error: TErr) => TNewErr): Result<TOk, TNewErr>

  /**
  Similar to `map` Except you must return a new `Result`.

  This is useful for when you need to do a subsequent computation using the
  inner `T` value, but that computation might fail.
  Additionally, `andThen` is really useful as a tool to flatten a
  `Result<Result<A, E2>, E1>` into a `Result<A, E2>` (see example below).

  @param mapperFn The function to apply to the current value
  */
  andThen<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): Result<InferOkTypes<TNewResult>, InferErrTypes<TNewResult> | TErr>

  andThen<TNewOk, TNewErr>(
    mapperFn: (value: TOk) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk, TErr | TNewErr>

  /**
  Takes an `Err` value and maps it to a `Result<T, SomeNewType>`.

  This is useful for error recovery.


  @param mapperFn  A function to apply to an `Err` value, leaving `Ok` values
  untouched.
  */
  orElse<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (error: TErr) => TNewResult,
  ): Result<InferOkTypes<TNewResult> | TOk, InferErrTypes<TNewResult>>

  orElse<TNewOk, TNewErr>(
    mapperFn: (error: TErr) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk | TOk, TNewErr>

  /**
  This "tee"s the current value to an passed-in computation such as side
  effect functions but still returns the same current value as the result.

  This is useful when you want to pass the current result to your side-track
  work such as logging but want to continue main-track work after that.
  This method does not care about the result of the passed in computation.

  @param sideEffectFn The function to apply to the current value
  */
  andTee(sideEffectFn: (value: TOk) => unknown): Result<TOk, TErr>

  /**
  This "tee"s the current `Err` value to an passed-in computation such as side
  effect functions but still returns the same `Err` value as the result.

  This is useful when you want to pass the current `Err` value to your side-track
  work such as logging but want to continue error-track work after that.
  This method does not care about the result of the passed in computation.

  @param sideEffectFn The function to apply to the current `Err` value
  */
  orTee(sideEffectFn: (t: TErr) => unknown): Result<TOk, TErr>

  /**
  Similar to `andTee` except error result of the computation will be passed
  to the downstream in case of an error.

  This version is useful when you want to make side-effects but in case of an
  error, you want to pass the error to the downstream.

  @param sideEffectFn The function to apply to the current value
  */
  andThrough<TNewResult extends Result<unknown, unknown>>(
    sideEffectFn: (value: TOk) => TNewResult,
  ): Result<TOk, InferErrTypes<TNewResult> | TErr>

  andThrough<TNewErr>(
    sideEffectFn: (value: TOk) => Result<unknown, TNewErr>,
  ): Result<TOk, TErr | TNewErr>

  /**
  Similar to `map` Except you must return a new `Result`.

  This is useful for when you need to do a subsequent async computation using
  the inner `T` value, but that computation might fail. Must return a ResultAsync

  @param mapper The function that returns a `ResultAsync` to apply to the current
  value
  */
  asyncAndThen<TNewOk, TNewErr>(
    mapper: (value: TOk) => ResultAsync<TNewOk, TNewErr>,
  ): ResultAsync<TNewOk, TErr | TNewErr>

  /**
  Maps a `Result<T, E>` to `ResultAsync<U, E>`
  by applying an async function to a contained `Ok` value, leaving an `Err`
  value untouched.

  @param mapperFn An async function to apply an `OK` value
  */
  asyncMap<TNewOk>(
    mapperFn: (value: TOk) => Promise<TNewOk>,
  ): ResultAsync<TNewOk, TErr>

  /**
  Unwrap the `Ok` value, or return the default if there is an `Err`

  @param defaultValue the default value to return if there is an `Err`
  */
  unwrapOr<TDefaultValue>(defaultValue: TDefaultValue): TOk | TDefaultValue

  /**

  Given 2 functions (one for the `Ok` variant and one for the `Err` variant)
  execute the function that matches the `Result` variant.

  Match callbacks do not necessitate to return a `Result`, however you can
  return a `Result` if you want to.

  `match` is like chaining `map` and `mapErr`, with the distinction that
  with `match` both functions must have the same return type.

  @param ok
  @param err
  */
  match<TOkMatch, TErrMatch = TOkMatch>(
    ok: (value: TOk) => TOkMatch,
    err: (error: TErr) => TErrMatch,
  ): TOkMatch | TErrMatch

  /**
  @deprecated will be removed in 9.0.0.

  You can use `safeTry` without this method.
  @example
  ```typescript
  safeTry(function* () {
    const okValue = yield* yourResult
  })
  ```
  Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
  */
  safeUnwrap(): Generator<Err<never, TErr>, TOk>

  /**
  **This method is unsafe, and should only be used in a test environments**

  Takes a `Result<T, E>` and returns a `T` when the result is an `Ok`, otherwise it throws a custom object.

  @param config
  */
  _unsafeUnwrap(config?: ErrorConfig): TOk

  /**
  **This method is unsafe, and should only be used in a test environments**

  takes a `Result<T, E>` and returns a `E` when the result is an `Err`,
  otherwise it throws a custom object.

  @param config
  */
  _unsafeUnwrapErr(config?: ErrorConfig): TErr
}

export class Ok<TOk, TErr> implements IResult<TOk, TErr> {
  public readonly value
  constructor(value: TOk) {
    this.value = value
  }

  isOk(): this is Ok<TOk, TErr> {
    return true
  }

  isErr(): this is Err<TOk, TErr> {
    return !this.isOk()
  }

  map<TNewOk>(mapperFn: (value: TOk) => TNewOk): Result<TNewOk, TErr> {
    return ok(mapperFn(this.value))
  }

  mapErr<TNewErr>(_mapperFn: (error: TErr) => TNewErr): Result<TOk, TNewErr> {
    return ok(this.value)
  }

  andThen<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): Result<InferOkTypes<TNewResult>, InferErrTypes<TNewResult> | TErr>

  andThen<TNewOk, TNewErr>(
    mapperFn: (value: TOk) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk, TErr | TNewErr>

  andThen<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): unknown {
    return mapperFn(this.value)
  }

  andThrough<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): Result<TOk, InferErrTypes<TNewResult> | TErr>

  andThrough<TNewErr>(
    mapperFn: (value: TOk) => Result<unknown, TNewErr>,
  ): Result<TOk, TErr | TNewErr>

  andThrough<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): unknown {
    return mapperFn(this.value).map((_value: unknown) => this.value)
  }

  andTee(sideEffectFn: (value: TOk) => unknown): Result<TOk, TErr> {
    try {
      sideEffectFn(this.value)
    } catch {
      // Tee doesn't care about the error
    }
    return ok<TOk, TErr>(this.value)
  }

  orTee(_sideEffectFn: (error: TErr) => unknown): Result<TOk, TErr> {
    return ok<TOk, TErr>(this.value)
  }

  orElse<TNewResult extends Result<unknown, unknown>>(
    _mapperFn: (error: TErr) => TNewResult,
  ): Result<InferOkTypes<TNewResult> | TOk, InferErrTypes<TNewResult>>

  orElse<TNewOk, TNewErr>(
    _mapperFn: (error: TErr) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk | TOk, TNewErr>

  orElse<TNewResult extends Result<unknown, unknown>>(
    _mapperFn: (error: TErr) => TNewResult,
  ): unknown {
    return ok(this.value)
  }

  asyncAndThen<TNewOk, TNewErr>(
    mapperFn: (value: TOk) => ResultAsync<TNewOk, TNewErr>,
  ): ResultAsync<TNewOk, TErr | TNewErr> {
    return mapperFn(this.value)
  }

  asyncAndThrough<TNewResult extends ResultAsync<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): ResultAsync<TOk, InferAsyncErrTypes<TNewResult> | TErr>

  asyncAndThrough<TNewErr>(
    mapperFn: (value: TOk) => ResultAsync<unknown, TNewErr>,
  ): ResultAsync<TOk, TErr | TNewErr>

  asyncAndThrough<TNewResult extends ResultAsync<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): unknown {
    return mapperFn(this.value).map(() => this.value)
  }

  asyncMap<TNewOk>(
    mapperFn: (value: TOk) => Promise<TNewOk>,
  ): ResultAsync<TNewOk, TErr> {
    return ResultAsync.fromSafePromise(mapperFn(this.value))
  }

  unwrapOr<TDefaultValue>(_defaultValue: TDefaultValue): TOk | TDefaultValue {
    return this.value
  }

  match<TOkMatch, TErrMatch = TOkMatch>(
    okFn: (value: TOk) => TOkMatch,
    _errFn: (error: TErr) => TErrMatch,
  ): TOkMatch | TErrMatch {
    return okFn(this.value)
  }

  safeUnwrap(): Generator<Err<never, TErr>, TOk> {
    const value = this.value
    /* eslint-disable-next-line require-yield */
    return (function* () {
      return value
    })()
  }

  // eslint-disable-next-line unicorn/prefer-private-class-fields -- This is not meant to be private
  _unsafeUnwrap(_?: ErrorConfig): TOk {
    return this.value
  }

  // eslint-disable-next-line unicorn/prefer-private-class-fields -- This is not meant to be private
  _unsafeUnwrapErr(config?: ErrorConfig): TErr {
    // eslint-disable-next-line @typescript-eslint/only-throw-error -- TODO make this into an error
    throw createNeverThrowError(
      'Called `_unsafeUnwrapErr` on an Ok',
      this,
      config,
    )
  }

  // eslint-disable-next-line require-yield
  *[Symbol.iterator](): Generator<Err<never, TErr>, TOk> {
    return this.value
  }
}

export class Err<TOk, TErr> implements IResult<TOk, TErr> {
  public readonly error
  constructor(error: TErr) {
    this.error = error
  }

  isOk(): this is Ok<TOk, TErr> {
    return false
  }

  isErr(): this is Err<TOk, TErr> {
    return !this.isOk()
  }

  map<TNewOk>(_mapperFn: (value: TOk) => TNewOk): Result<TNewOk, TErr> {
    return err(this.error)
  }

  mapErr<TNewErr>(mapperFn: (error: TErr) => TNewErr): Result<TOk, TNewErr> {
    return err(mapperFn(this.error))
  }

  andThrough<TNewErr>(
    _mapperFn: (value: TOk) => Result<unknown, TNewErr>,
  ): Result<TOk, TErr | TNewErr> {
    return err(this.error)
  }

  andTee(_mapperFn: (value: TOk) => unknown): Result<TOk, TErr> {
    return err(this.error)
  }

  orTee(mapperFn: (value: TErr) => unknown): Result<TOk, TErr> {
    try {
      mapperFn(this.error)
    } catch {
      // Tee doesn't care about the error
    }
    return err<TOk, TErr>(this.error)
  }

  andThen<TNewResult extends Result<unknown, unknown>>(
    _mapperFn: (value: TOk) => TNewResult,
  ): Result<InferOkTypes<TNewResult>, InferErrTypes<TNewResult> | TErr>

  andThen<TNewOk, TNewErr>(
    _mapperFn: (value: TOk) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk, TErr | TNewErr>

  andThen<TNewResult extends Result<unknown, unknown>>(
    _mapperFn: (value: TOk) => TNewResult,
  ): unknown {
    return err(this.error)
  }

  orElse<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (error: TErr) => TNewResult,
  ): Result<InferOkTypes<TNewResult> | TOk, InferErrTypes<TNewResult>>

  orElse<TNewOk, TNewErr>(
    mapperFn: (error: TErr) => Result<TNewOk, TNewErr>,
  ): Result<TNewOk | TOk, TNewErr>

  orElse<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (error: TErr) => TNewResult,
  ): unknown {
    return mapperFn(this.error)
  }

  asyncAndThen<TNewOk, TNewErr>(
    _mapperFn: (value: TOk) => ResultAsync<TNewOk, TNewErr>,
  ): ResultAsync<TNewOk, TErr | TNewErr> {
    return errAsync<TNewOk, TErr>(this.error)
  }

  asyncAndThrough<TNewErr>(
    _mapperFn: (value: TOk) => ResultAsync<unknown, TNewErr>,
  ): ResultAsync<TOk, TErr | TNewErr> {
    return errAsync<TOk, TErr>(this.error)
  }

  asyncMap<TNewOk>(
    _mapperFn: (value: TOk) => Promise<TNewOk>,
  ): ResultAsync<TNewOk, TErr> {
    return errAsync<TNewOk, TErr>(this.error)
  }

  unwrapOr<TDefaultValue>(defaultValue: TDefaultValue): TOk | TDefaultValue {
    return defaultValue
  }

  match<TOkMatch, TErrorMatch = TOkMatch>(
    _okFn: (value: TOk) => TOkMatch,
    errFn: (error: TErr) => TErrorMatch,
  ): TOkMatch | TErrorMatch {
    return errFn(this.error)
  }

  safeUnwrap(): Generator<Err<never, TErr>, TOk> {
    const error = this.error
    return (function* () {
      yield err(error)

      throw new Error('Do not use this generator out of `safeTry`')
    })()
  }

  // eslint-disable-next-line unicorn/prefer-private-class-fields -- This function is not meant to be private
  _unsafeUnwrap(config?: ErrorConfig): TOk {
    // eslint-disable-next-line @typescript-eslint/only-throw-error -- TODO make real error
    throw createNeverThrowError(
      'Called `_unsafeUnwrap` on an Err',
      this,
      config,
    )
  }

  // eslint-disable-next-line unicorn/prefer-private-class-fields -- This function is not meant to be private
  _unsafeUnwrapErr(_?: ErrorConfig): TErr {
    return this.error
  }

  *[Symbol.iterator](): Generator<Err<never, TErr>, TOk> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
    const self = this
    // @ts-expect-error -- This is structurally equivalent and safe, TODO find better solution
    yield self
    // @ts-expect-error -- This is structurally equivalent and safe, TODO find better solution
    return self
  }
}

//#region Combine - Types TODO

// This is a helper type to prevent infinite recursion in typing rules.
//
// Use this with your `depth` variable in your types.
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  ...0[],
]

// Collects the results array into separate tuple array.
//
// T         - The array of the results
// Collected - The collected tuples.
// Depth     - The maximum depth.
type CollectResults<
  T,
  Collected extends unknown[] = [],
  Depth extends number = 50,
> = [Depth] extends [never]
  ? []
  : T extends [infer H, ...infer Rest]
    ? // And test whether the head of the list is a result
      H extends Result<infer L, infer R>
      ? // Continue collecting...
        CollectResults<
          // the rest of the elements
          Rest,
          // The collected
          [...Collected, [L, R]],
          // and one less of the current depth
          Prev[Depth]
        >
      : never // Impossible
    : Collected

// Transposes an array
//
// A          - The array source
// Transposed - The collected transposed array
// Depth      - The maximum depth.
export type Transpose<
  A,
  Transposed extends unknown[][] = [],
  Depth extends number = 10,
> = A extends [infer T, ...infer Rest]
  ? T extends [infer L, infer R]
    ? Transposed extends [infer PL, infer PR]
      ? PL extends unknown[]
        ? PR extends unknown[]
          ? Transpose<Rest, [[...PL, L], [...PR, R]], Prev[Depth]>
          : never
        : never
      : Transpose<Rest, [[L], [R]], Prev[Depth]>
    : Transposed
  : Transposed

// Combines the both sides of the array of the results into a tuple of the union of the ok types and the union of the err types.
//
// T     - The array of the results
// Depth - The maximum depth.
export type Combine<T, Depth extends number = 5> =
  Transpose<CollectResults<T>, [], Depth> extends [infer L, infer R]
    ? [UnknownMembersToNever<L>, UnknownMembersToNever<R>]
    : Transpose<CollectResults<T>, [], Depth> extends []
      ? [[], []]
      : never

// Deduplicates the result, as the result type is a union of Err and Ok types.
export type Dedup<T> =
  T extends Result<infer RL, infer RR>
    ? [unknown] extends [RL]
      ? Err<RL, RR>
      : Ok<RL, RR>
    : T

// Given a union, this gives the array of the union members.
export type MemberListOf<T> = (
  (T extends unknown ? (t: T) => T : never) extends infer U
    ? (U extends unknown ? (u: U) => unknown : never) extends (
        v: infer V,
      ) => unknown
      ? V
      : never
    : never
) extends (_: unknown) => infer W
  ? [...MemberListOf<Exclude<T, W>>, W]
  : []

// Converts an empty array to never.
//
// The second type parameter here will affect how to behave to `never[]`s.
// If a precise type is required, pass `1` here so that it will resolve
// a literal array such as `[ never, never ]`. Otherwise, set `0` or the default
// type value will cause this to resolve the arrays containing only `never`
// items as `never` only.
export type EmptyArrayToNever<
  T,
  NeverArrayToNever extends number = 0,
> = T extends []
  ? never
  : NeverArrayToNever extends 1
    ? T extends [never, ...infer Rest]
      ? [EmptyArrayToNever<Rest>] extends [never]
        ? never
        : T
      : T
    : T

// Converts the `unknown` items of an array to `never`s.
type UnknownMembersToNever<T> = T extends [infer H, ...infer R]
  ? [[unknown] extends [H] ? never : H, ...UnknownMembersToNever<R>]
  : T

// Gets the member type of the array or never.
export type MembersToUnion<T> = T extends unknown[] ? T[number] : never

// Checks if the given type is a literal array.
export type IsLiteralArray<T> = T extends { length: infer L }
  ? L extends number
    ? number extends L
      ? 0
      : 1
    : 0
  : 0

// Traverses an array of results and returns a single result containing
// the oks and errs union-ed/combined.
type Traverse<T, Depth extends number = 5> =
  Combine<T, Depth> extends [infer Oks, infer Errs]
    ? Result<EmptyArrayToNever<Oks, 1>, MembersToUnion<Errs>>
    : never

// Traverses an array of results and returns a single result containing
// the oks combined and the array of errors combined.
type TraverseWithAllErrors<T, Depth extends number = 5> =
  Traverse<T, Depth> extends Result<infer Oks, infer Errs>
    ? Result<Oks, Errs[]>
    : never

// Combines the array of results into one result.
export type CombineResults<T extends readonly Result<unknown, unknown>[]> =
  IsLiteralArray<T> extends 1
    ? Traverse<T>
    : Result<ExtractOkTypes<T>, ExtractErrTypes<T>[number]>

// Combines the array of results into one result with all errors.
export type CombineResultsWithAllErrorsArray<
  T extends readonly Result<unknown, unknown>[],
> =
  IsLiteralArray<T> extends 1
    ? TraverseWithAllErrors<T>
    : Result<ExtractOkTypes<T>, ExtractErrTypes<T>[number][]>
