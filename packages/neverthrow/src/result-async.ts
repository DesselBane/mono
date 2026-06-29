/* eslint-disable unicorn/prefer-await */
import type {
  Combine,
  Dedup,
  EmptyArrayToNever,
  IsLiteralArray,
  MemberListOf,
  MembersToUnion,
} from './result'
import type {
  ExtractErrAsyncTypes,
  ExtractOkAsyncTypes,
  InferAsyncErrTypes,
  InferAsyncOkTypes,
  InferErrTypes,
  InferOkTypes,
} from './_internals/utils'
import {
  combineResultAsyncList,
  combineResultAsyncListWithAllErrors,
} from './_internals/utils'
import type { Result } from './'
import { Err, Ok } from './'

export class ResultAsync<TOk, TErr> implements PromiseLike<Result<TOk, TErr>> {
  static fromSafePromise<TOk, TErr = never>(
    promise: Promise<TOk> | PromiseLike<TOk>,
  ): ResultAsync<TOk, TErr> {
    const newPromise = promise.then((value: TOk) => new Ok<TOk, TErr>(value))

    return new ResultAsync(newPromise)
  }

  static fromPromise<TOk, TErr>(
    promise: Promise<TOk> | PromiseLike<TOk>,
    errorFn: (error: unknown) => TErr,
  ): ResultAsync<TOk, TErr> {
    const newPromise = promise.then(
      (value: TOk) => new Ok<TOk, TErr>(value),
      (error: unknown) => new Err<TOk, TErr>(errorFn(error)),
    )

    return new ResultAsync(newPromise)
  }

  static fromThrowable<TArgs extends readonly unknown[], TResult>(
    fn: (...args: TArgs) => Promise<TResult>,
  ): (...args: TArgs) => ResultAsync<TResult, unknown>
  static fromThrowable<TArgs extends readonly unknown[], TResult, TError>(
    fn: (...args: TArgs) => Promise<TResult>,
    errorFn: (err: unknown) => TError,
  ): (...args: TArgs) => ResultAsync<TResult, TError>
  static fromThrowable<TArgs extends readonly unknown[], TResult, TError>(
    fn: (...args: TArgs) => Promise<TResult>,
    errorFn?: (err: unknown) => TError,
  ): (...args: TArgs) => ResultAsync<TResult, unknown> {
    return (...args) => {
      return new ResultAsync(
        (async () => {
          try {
            return new Ok(await fn(...args))
          } catch (error) {
            return new Err(errorFn?.(error) ?? error)
          }
        })(),
      )
    }
  }

  static combine<
    TResultList extends readonly [
      ResultAsync<unknown, unknown>,
      ...ResultAsync<unknown, unknown>[],
    ],
  >(asyncResultList: TResultList): CombineResultAsyncs<TResultList>

  static combine<TResultList extends readonly ResultAsync<unknown, unknown>[]>(
    asyncResultList: TResultList,
  ): CombineResultAsyncs<TResultList>

  static combine<TResultList extends readonly ResultAsync<unknown, unknown>[]>(
    asyncResultList: TResultList,
  ): CombineResultAsyncs<TResultList> {
    // TODO
    return combineResultAsyncList(
      asyncResultList,
    ) as CombineResultAsyncs<TResultList>
  }

  static combineWithAllErrors<
    TResultList extends readonly [
      ResultAsync<unknown, unknown>,
      ...ResultAsync<unknown, unknown>[],
    ],
  >(
    asyncResultList: TResultList,
  ): CombineResultsWithAllErrorsArrayAsync<TResultList>

  static combineWithAllErrors<
    TResultList extends readonly ResultAsync<unknown, unknown>[],
  >(
    asyncResultList: TResultList,
  ): CombineResultsWithAllErrorsArrayAsync<TResultList>

  static combineWithAllErrors<
    TResultList extends readonly ResultAsync<unknown, unknown>[],
  >(
    asyncResultList: TResultList,
  ): CombineResultsWithAllErrorsArrayAsync<TResultList> {
    return combineResultAsyncListWithAllErrors(
      asyncResultList,
    ) as CombineResultsWithAllErrorsArrayAsync<TResultList>
  }

  private _promise

  constructor(res: PromiseLike<Result<TOk, TErr>>) {
    this._promise = res
  }

  map<TNewOk>(
    mapperFn: (value: TOk) => TNewOk | Promise<TNewOk>,
  ): ResultAsync<TNewOk, TErr> {
    return new ResultAsync(
      this._promise.then(async (res: Result<TOk, TErr>) => {
        if (res.isErr()) {
          return new Err<TNewOk, TErr>(res.error)
        }

        return new Ok<TNewOk, TErr>(await mapperFn(res.value))
      }),
    )
  }

  andThrough<TNewErr>(
    mapperFn: (
      value: TOk,
    ) => Result<unknown, TNewErr> | ResultAsync<unknown, TNewErr>,
  ): ResultAsync<TOk, TErr | TNewErr> {
    return new ResultAsync(
      this._promise.then(async (res: Result<TOk, TErr>) => {
        if (res.isErr()) {
          return new Err<TOk, TErr>(res.error)
        }

        const newRes = await mapperFn(res.value)
        if (newRes.isErr()) {
          return new Err<TOk, TNewErr>(newRes.error)
        }
        return new Ok<TOk, TNewErr>(res.value)
      }),
    )
  }

  andTee(mapperFn: (value: TOk) => unknown): ResultAsync<TOk, TErr> {
    return new ResultAsync(
      this._promise.then(async (res: Result<TOk, TErr>) => {
        if (res.isErr()) {
          return new Err<TOk, TErr>(res.error)
        }
        try {
          await mapperFn(res.value)
        } catch {
          // Tee does not care about the error
        }
        return new Ok<TOk, TErr>(res.value)
      }),
    )
  }

  orTee(mapperFn: (error: TErr) => unknown): ResultAsync<TOk, TErr> {
    return new ResultAsync(
      this._promise.then(async (res: Result<TOk, TErr>) => {
        if (res.isOk()) {
          return new Ok<TOk, TErr>(res.value)
        }
        try {
          await mapperFn(res.error)
        } catch {
          // Tee does not care about the error
        }
        return new Err<TOk, TErr>(res.error)
      }),
    )
  }

  mapErr<TNewErr>(
    mapperFn: (error: TErr) => TNewErr | Promise<TNewErr>,
  ): ResultAsync<TOk, TNewErr> {
    return new ResultAsync(
      this._promise.then(async (res: Result<TOk, TErr>) => {
        if (res.isOk()) {
          return new Ok<TOk, TNewErr>(res.value)
        }

        return new Err<TOk, TNewErr>(await mapperFn(res.error))
      }),
    )
  }

  andThen<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): ResultAsync<InferOkTypes<TNewResult>, InferErrTypes<TNewResult> | TErr>

  andThen<TNewResult extends ResultAsync<unknown, unknown>>(
    mapperFn: (value: TOk) => TNewResult,
  ): ResultAsync<
    InferAsyncOkTypes<TNewResult>,
    InferAsyncErrTypes<TNewResult> | TErr
  >

  andThen<TNewOk, TNewErr>(
    mapperFn: (
      value: TOk,
    ) => Result<TNewOk, TNewErr> | ResultAsync<TNewOk, TNewErr>,
  ): ResultAsync<TNewOk, TErr | TNewErr>

  andThen<
    TNewResult extends Result<unknown, unknown> | ResultAsync<unknown, unknown>,
  >(mapperFn: (value: TOk) => TNewResult): unknown {
    return new ResultAsync(
      this._promise.then((res) => {
        if (res.isErr()) {
          return new Err<never, TErr>(res.error)
        }

        const newValue = mapperFn(res.value)
        return newValue instanceof ResultAsync ? newValue._promise : newValue
      }),
    )
  }

  orElse<TNewResult extends Result<unknown, unknown>>(
    mapperFn: (error: TErr) => TNewResult,
  ): ResultAsync<InferOkTypes<TNewResult> | TOk, InferErrTypes<TNewResult>>

  orElse<TNewResult extends ResultAsync<unknown, unknown>>(
    mapperFn: (error: TErr) => TNewResult,
  ): ResultAsync<
    InferAsyncOkTypes<TNewResult> | TOk,
    InferAsyncErrTypes<TNewResult>
  >
  orElse<TNewOk, TNewErr>(
    f: (e: TErr) => Result<TNewOk, TNewErr> | ResultAsync<TNewOk, TNewErr>,
  ): ResultAsync<TNewOk | TOk, TNewErr>

  orElse<
    TNewResult extends Result<unknown, unknown> | ResultAsync<unknown, unknown>,
  >(mapperFn: (error: TErr) => TNewResult): unknown {
    return new ResultAsync(
      this._promise.then((res) => {
        if (res.isErr()) {
          const newValue = mapperFn(res.error)
          return newValue instanceof ResultAsync ? newValue._promise : newValue
        }

        return new Ok<TOk, TErr>(res.value)
      }),
    )
  }

  match<TOkMatch, TErrMatch = TOkMatch>(
    okFn: (value: TOk) => TOkMatch,
    _errFn: (error: TErr) => TErrMatch,
  ): PromiseLike<TOkMatch | TErrMatch> {
    return this._promise.then((res) => res.match(okFn, _errFn))
  }

  unwrapOr<TOr>(orValue: TOr): PromiseLike<TOk | TOr> {
    return this._promise.then((res) => res.unwrapOr(orValue))
  }

  /**
  @deprecated will be removed in 9.0.0.

  You can use `safeTry` without this method.
  @example
  ```typescript
  safeTry(async function* () {
    const okValue = yield* yourResult
  })
  ```
  Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
  */
  async *safeUnwrap(): AsyncGenerator<Err<never, TErr>, TOk> {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return yield* await this._promise.then((res) => res.safeUnwrap())
  }

  // Makes ResultAsync implement PromiseLike<Result>
  // eslint-disable-next-line unicorn/no-thenable -- This is intentional
  then<TSuccess, TFailure>(
    successCallback?: (
      res: Result<TOk, TErr>,
    ) => TSuccess | PromiseLike<TSuccess>,
    failureCallback?: (reason: unknown) => TFailure | PromiseLike<TFailure>,
  ): PromiseLike<TSuccess | TFailure> {
    return this._promise.then(successCallback, failureCallback)
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Err<never, TErr>, TOk> {
    const result = await this._promise

    if (result.isErr()) {
      // @ts-expect-error -- This is structurally equivalent and safe
      yield errAsync(result.error)
    }

    // @ts-expect-error -- This is structurally equivalent and safe
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.value
  }
}

export function okAsync<TOk, TErr = never>(value: TOk): ResultAsync<TOk, TErr>
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters, unused-imports/no-unused-vars
export function okAsync<TOk extends void = void, TErr = never>(
  value: void,
): ResultAsync<void, TErr>
export function okAsync<TOk, TErr = never>(value: TOk): ResultAsync<TOk, TErr> {
  return new ResultAsync(Promise.resolve(new Ok<TOk, TErr>(value)))
}

export function errAsync<TOk = never, TErr = unknown>(
  err: TErr,
): ResultAsync<TOk, TErr>
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters, unused-imports/no-unused-vars
export function errAsync<TOk = never, TErr extends void = void>(
  err: void,
): ResultAsync<TOk, void>
export function errAsync<TOk = never, TErr = unknown>(
  err: TErr,
): ResultAsync<TOk, TErr> {
  return new ResultAsync(Promise.resolve(new Err<TOk, TErr>(err)))
}

// eslint-disable-next-line @typescript-eslint/unbound-method
export const fromPromise = ResultAsync.fromPromise
// eslint-disable-next-line @typescript-eslint/unbound-method
export const fromSafePromise = ResultAsync.fromSafePromise

// eslint-disable-next-line @typescript-eslint/unbound-method
export const fromAsyncThrowable = ResultAsync.fromThrowable

// Combines the array of async results into one result.
export type CombineResultAsyncs<
  T extends readonly ResultAsync<unknown, unknown>[],
> =
  IsLiteralArray<T> extends 1
    ? TraverseAsync<UnwrapAsync<T>>
    : ResultAsync<ExtractOkAsyncTypes<T>, ExtractErrAsyncTypes<T>[number]>

// Combines the array of async results into one result with all errors.
export type CombineResultsWithAllErrorsArrayAsync<
  T extends readonly ResultAsync<unknown, unknown>[],
> =
  IsLiteralArray<T> extends 1
    ? TraverseWithAllErrorsAsync<UnwrapAsync<T>>
    : ResultAsync<ExtractOkAsyncTypes<T>, ExtractErrAsyncTypes<T>[number][]>

// Unwraps the inner `Result` from a `ResultAsync` for all elements.
type UnwrapAsync<T> =
  IsLiteralArray<T> extends 1
    ? Writable<T> extends [infer H, ...infer Rest]
      ? H extends PromiseLike<infer HI>
        ? HI extends Result<unknown, unknown>
          ? [Dedup<HI>, ...UnwrapAsync<Rest>]
          : never
        : never
      : []
    : // If we got something too general such as ResultAsync<X, Y>[] then we
      // simply need to map it to ResultAsync<X[], Y[]>. Yet `ResultAsync`
      // itself is a union therefore it would be enough to cast it to Ok.
      T extends (infer A)[]
      ? A extends PromiseLike<infer HI>
        ? HI extends Result<infer L, infer R>
          ? Ok<L, R>[]
          : never
        : never
      : never

// Traverse through the tuples of the async results and create one
// `ResultAsync` where the collected tuples are merged.
type TraverseAsync<T, Depth extends number = 5> =
  IsLiteralArray<T> extends 1
    ? Combine<T, Depth> extends [infer Oks, infer Errs]
      ? ResultAsync<EmptyArrayToNever<Oks>, MembersToUnion<Errs>>
      : never
    : // The following check is important if we somehow reach to the point of
      // checking something similar to ResultAsync<X, Y>[]. In this case we don't
      // know the length of the elements, therefore we need to traverse the X and Y
      // in a way that the result should contain X[] and Y[].
      T extends (infer I)[]
      ? // The MemberListOf<I> here is to include all possible types. Therefore
        // if we face (ResultAsync<X, Y> | ResultAsync<A, B>)[] this type should
        // handle the case.
        Combine<MemberListOf<I>, Depth> extends [infer Oks, infer Errs]
        ? // The following `extends unknown[]` checks are just to satisfy the TS.
          // we already expect them to be an array.
          Oks extends unknown[]
          ? Errs extends unknown[]
            ? ResultAsync<
                EmptyArrayToNever<Oks[number][]>,
                MembersToUnion<Errs[number][]>
              >
            : ResultAsync<EmptyArrayToNever<Oks[number][]>, Errs>
          : // The rest of the conditions are to satisfy the TS and support
            // the edge cases which are not really expected to happen.
            Errs extends unknown[]
            ? ResultAsync<Oks, MembersToUnion<Errs[number][]>>
            : ResultAsync<Oks, Errs>
        : never
      : never

// This type is similar to the `TraverseAsync` while the errors are also
// collected in a list. For the checks/conditions made here, see that type
// for the documentation.
type TraverseWithAllErrorsAsync<T, Depth extends number = 5> =
  TraverseAsync<T, Depth> extends ResultAsync<infer Oks, infer Errs>
    ? ResultAsync<Oks, Errs[]>
    : never

// Converts a reaodnly array into a writable array
type Writable<T> = T extends readonly unknown[] ? [...T] : T
