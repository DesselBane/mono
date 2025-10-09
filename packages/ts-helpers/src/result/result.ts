export type ValueResult<TValue> = TValue extends unknown[]
  ? ArrayValueResult<TValue>
  : NonArrayValueResult<TValue>

export type Result<TValue, TError extends Error = Error> =
  | ValueResult<TValue>
  | ErrorResult<TError>

abstract class ValueBaseResult<TValue> {
  readonly value: TValue
  readonly error: undefined

  constructor(value: TValue) {
    this.value = value
  }

  mapError(): this {
    return this
  }
  catchIf(): this {
    return this
  }

  isError(): this is ErrorResult<never> {
    return false
  }

  mapValue<TValueOut>(
    mapper: (value: TValue) => TValueOut,
  ): ValueResult<TValueOut> {
    return createValueResult(mapper(this.value))
  }

  errorIf<TErrorOut extends Error>(
    mapper: (value: TValue) => TErrorOut,
  ): ErrorResult<TErrorOut>
  errorIf<TErrorOut extends Error>(
    mapper: (value: TValue) => TErrorOut,
    condition: (value: TValue) => boolean,
  ): this | ErrorResult<TErrorOut>
  errorIf<TErrorOut extends Error>(
    mapper: (value: TValue) => TErrorOut,
    condition: (value: TValue) => boolean = () => true,
  ): this | ErrorResult<TErrorOut> {
    if (condition(this.value)) {
      return new ErrorResult(mapper(this.value))
    }
    return this
  }
}

export class NonArrayValueResult<TValue> extends ValueBaseResult<TValue> {
  constructor(value: TValue) {
    if (Array.isArray(value)) {
      throw new TypeError('Must use ArrayValueResult for array values')
    }
    super(value)
  }
}

export class ArrayValueResult<
  TValue extends unknown[],
> extends ValueBaseResult<TValue> {
  constructor(value: TValue) {
    if (!Array.isArray(value)) {
      throw new TypeError('Must use ValueResult for non-array values')
    }
    super(value)
  }

  mapInnerValue<TValueOut>(
    mapper: (
      item: TValue[number],
      index: number,
      array: TValue[number][],
    ) => TValueOut,
  ): ArrayValueResult<TValueOut[]> {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const newValue = this.value.map(mapper)

    return new ArrayValueResult(newValue)
  }

  filterValue(
    predicate: (
      value: TValue[number],
      index: number,
      array: TValue[number][],
    ) => boolean,
  ): ArrayValueResult<TValue[number][]> {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return new ArrayValueResult(this.value.filter(predicate))
  }

  // Neccessary as overloaded functions with a predicate do not work in a type union like the Result => https://github.com/microsoft/TypeScript/issues/58660
  filterNarrowValue<TValueOut>(
    predicate: (
      value: TValue[number],
      index: number,
      array: TValue[number][],
    ) => value is TValueOut,
  ): ArrayValueResult<TValueOut[]> {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return new ArrayValueResult(this.value.filter(predicate))
  }
}

export class ErrorResult<TError extends Error> {
  readonly value: undefined
  readonly error: TError
  constructor(error: TError) {
    this.error = error
  }
  mapValue(): this {
    return this
  }

  errorIf(): this {
    return this
  }

  isError(): this is ErrorResult<TError> {
    return true
  }

  mapInnerValue(): this {
    return this
  }
  filterValue(): this {
    return this
  }
  filterNarrowValue(): this {
    return this
  }

  mapError<TErrorOut extends Error>(
    mapper: (error: TError) => TErrorOut,
  ): ErrorResult<TErrorOut> {
    return new ErrorResult(mapper(this.error))
  }

  catchIf<TValueOut>(
    mapper: (error: TError) => TValueOut,
  ): ValueResult<TValueOut>
  catchIf<TValueOut>(
    mapper: (error: TError) => TValueOut,
    condition: (error: TError) => boolean,
  ): Result<TValueOut, TError>
  catchIf<TValueOut>(
    mapper: (error: TError) => TValueOut,
    condition: (error: TError) => boolean = () => true,
  ): Result<TValueOut, TError> {
    if (condition(this.error)) {
      return createValueResult(mapper(this.error))
    }
    return this
  }
}

export function createValueResult<T extends unknown[]>(value: T): ValueResult<T>
export function createValueResult<T>(value: T): ValueResult<T>
export function createValueResult<T>(value: T): unknown {
  return Array.isArray(value)
    ? new ArrayValueResult(value)
    : new NonArrayValueResult(value)
}

export type VoidResult<TError extends Error = Error> = Result<void, TError>

export const VOID_VALUE_RESULT = new NonArrayValueResult<void>(undefined)
