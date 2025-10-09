import { UnknownError } from '../safe-try/safe-try'
import {
  ArrayValueResult,
  createValueResult,
  ErrorResult,
  NonArrayValueResult,
} from './result'
import type { Result } from './result'

// Arrange
const testError = new Error('test error')

const errorResult = new ErrorResult(testError)
const nonArrayValueResult = new NonArrayValueResult(42)
const arrayValueResult = new ArrayValueResult([42])
const result = createTestResult(42, new Error('random error'))

// If only one type is used TS is smart enough to know that it can't be either or so we need to make sure that both are possible to have a true result
function createTestResult<TValue, TError extends Error>(
  value: TValue,
  error: TError,
  creationMethod: 'value' | 'error' | 'random' = 'random',
): Result<TValue, TError> {
  switch (creationMethod) {
    case 'value': {
      return createValueResult(value)
    }
    case 'error': {
      return new ErrorResult(error)
    }
    case 'random': {
      return Math.random() > 0.5
        ? createValueResult(value)
        : new ErrorResult(error)
    }
  }
}

describe('result', () => {
  describe('basic props', () => {
    it('[ErrorResult] should have a value of undefined', () => {
      // Assert
      expect(errorResult.value).toBeUndefined()
    })

    it('[ErrorResult] should have the passed error', () => {
      // Assert
      expect(errorResult.error).toBe(testError)
    })

    it('[ValueResult] should have an error of undefined', () => {
      // Assert
      expect(nonArrayValueResult.error).toBeUndefined()
      expect(arrayValueResult.error).toBeUndefined()
    })

    it('[ValueResult] should have the passed value', () => {
      // Assert
      expect(nonArrayValueResult.value).toBe(42)
      expect(arrayValueResult.value).toStrictEqual([42])
    })
  })

  describe('isError', () => {
    it('[ErrorResult] should be true', () => {
      // Assert
      expect(errorResult.isError()).toBe(true)
    })

    it('[ValueResult] should be false', () => {
      // Assert
      expect(nonArrayValueResult.isError()).toBe(false)
      expect(arrayValueResult.isError()).toBe(false)
    })

    // eslint-disable-next-line vitest/expect-expect
    it('should narrow the type for ErrorResult', () => {
      // TODO(MOR) move these tests to be vitest type tests
      // @ts-expect-error expect that the return type is Error | undefined
      let _localError: Error = result.error
      // @ts-expect-error expect that the return type is number | undefined
      let _localValue: number = result.value

      if (result.isError()) {
        // expect no error
        _localError = result.error
        // @ts-expect-error expect that the return type is undefined
        _localValue = result.value
      } else {
        // @ts-expect-error expect that the return type is undefined
        _localError = result.error
        // expect no error
        _localValue = result.value
      }
    })
  })

  describe('mapError', () => {
    it('[ErrorResult] should map the error to another error', () => {
      // Arrange
      const mapperSpy = vi.fn<(error: Error) => UnknownError>(
        (error: Error) => new UnknownError(error),
      )
      // Act
      const mappedErrorResult = errorResult.mapError(mapperSpy)

      // Assert
      expect(mappedErrorResult).toBeInstanceOf(ErrorResult)
      expect(mappedErrorResult.error).toBeInstanceOf(UnknownError)
      expect(mapperSpy).toHaveBeenCalledWith(testError)
    })

    it('[ValueResult] should return itself', () => {
      // Act
      const mappedNonArrayValueResult = nonArrayValueResult.mapError()
      const mappedArrayValueResult = arrayValueResult.mapError()

      // Assert
      expect(mappedNonArrayValueResult).toBe(nonArrayValueResult)
      expect(mappedArrayValueResult).toBe(arrayValueResult)
    })

    it('should work for the general result', () => {
      // Act
      const mappedResult = result.mapError((error) => new UnknownError(error))

      // Assert
      expect(mappedResult).toBeDefined()
    })
  })

  describe('mapValue', () => {
    it('[ValueResult] should map the value to another value', () => {
      // Arrange
      const mapperSpy = vi.fn<(value: number) => string>(String)
      // Act
      const mappedNonArrayValueResult = nonArrayValueResult.mapValue(mapperSpy)

      // Assert
      expect(mappedNonArrayValueResult).toBeInstanceOf(NonArrayValueResult)
      expect(mappedNonArrayValueResult.value).toBe('42')
      expect(mapperSpy).toHaveBeenCalledWith(42)
    })

    it('[NonArrayValueResult]->[ArrayValueResult] should map to the correct specialization depending on the value returned by the mapper', () => {
      // Arrange
      const mapperSpy = vi.fn<(value: number) => string[]>((value: number) => [
        String(value),
      ])
      // Act
      const mappedNonArrayValueResult = nonArrayValueResult.mapValue(mapperSpy)

      // Assert
      expect(mappedNonArrayValueResult).toBeInstanceOf(ArrayValueResult)
      expect(mappedNonArrayValueResult.value).toStrictEqual(['42'])
      expect(mapperSpy).toHaveBeenCalledWith(42)
    })

    it('[ErrorResult] should return itself', () => {
      // Act
      const mappedErrorResult = errorResult.mapValue()

      // Assert
      expect(mappedErrorResult).toBe(errorResult)
    })

    it('should work for the general result', () => {
      // Act
      const mappedResult = result.mapValue(String)

      // Assert
      expect(mappedResult).toBeDefined()
    })
  })

  describe('catchIf', () => {
    it('[ErrorResult] should return the mapped value if the condition is met', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => true)
      const mapperSpy = vi.fn<() => number>(() => 5)

      // Act
      const caughtResult = errorResult.catchIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(NonArrayValueResult)
      expect(caughtResult.value).toBe(5)
      expect(conditionSpy).toHaveBeenCalledWith(testError)
      expect(mapperSpy).toHaveBeenCalledWith(testError)
    })

    it('[ErrorResult] should return the correct specialization depending on the mapped value', () => {
      // Arrange
      const mapperSpy = vi.fn<() => number[]>(() => [5])

      // Act
      const caughtResult = errorResult.catchIf(mapperSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(ArrayValueResult)
      expect(caughtResult.value).toStrictEqual([5])
    })

    it('[ErrorResult] should default the condition to true', () => {
      // Arrange
      const mapperSpy = vi.fn<() => number>(() => 5)

      // Act
      const caughtResult = errorResult.catchIf(mapperSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(NonArrayValueResult)
      expect(caughtResult.value).toBe(5)
      expect(mapperSpy).toHaveBeenCalledWith(testError)
    })

    it('[ErrorResult] should return itself without mapping if the condition is false', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => false)
      const mapperSpy = vi.fn<() => number>(() => 5)

      // Act
      const caughtResult = errorResult.catchIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBe(errorResult)
      expect(conditionSpy).toHaveBeenCalledWith(testError)
      expect(mapperSpy).not.toHaveBeenCalled()
    })

    it('[ValueResult] should return itself', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => false)
      const mapperSpy = vi.fn<() => number>(() => 5)

      // Act
      const caughtResult = nonArrayValueResult.catchIf()

      // Assert
      expect(caughtResult).toBe(nonArrayValueResult)
      expect(conditionSpy).not.toHaveBeenCalled()
      expect(mapperSpy).not.toHaveBeenCalled()
    })

    // TODO(MOR) move this to a type test with https://bc-tfs.activedirectory.bissantz.de/tfs/DefaultCollection/DeltaMaster/_sprints/taskboard/DeltaMaster%20Team/DeltaMaster/2025/Sprint%2020?workitem=33287
    it('should infer return type is a ValueResult if no condition is passed', () => {
      // Assert
      // expect type to be ErrorResult
      const result: NonArrayValueResult<number> = errorResult.catchIf(() => 5)

      expect(result).toBeInstanceOf(NonArrayValueResult)
    })

    // TODO(MOR) move this to a type test with https://bc-tfs.activedirectory.bissantz.de/tfs/DefaultCollection/DeltaMaster/_sprints/taskboard/DeltaMaster%20Team/DeltaMaster/2025/Sprint%2020?workitem=33287
    it('should infer return type is a Result if any condition is passed', () => {
      // Assert
      // @ts-expect-error expect type to be Result
      const valueResult: NonArrayValueResult<number> = errorResult.catchIf(
        () => 5,
        () => true,
      )
      // expect type to be Result
      const result: Result<number> = errorResult.catchIf(
        () => 5,
        () => true,
      )

      expect(valueResult).toBeInstanceOf(NonArrayValueResult)
      expect(result).toBeInstanceOf(NonArrayValueResult)
    })

    it('should work for the general result', () => {
      // Act
      const caughtResult = result.catchIf(
        (_error) => 5,
        () => false,
      )

      // Assert
      expect(caughtResult).toBeDefined()
    })
  })

  describe('errorIf', () => {
    it('[NonArrayValueResult] should return the mapped value if the condition is met', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => true)
      const mapperSpy = vi.fn<(value: number) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = nonArrayValueResult.errorIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(ErrorResult)
      expect(caughtResult.error?.cause).toBe(nonArrayValueResult.value)
      expect(conditionSpy).toHaveBeenCalledWith(nonArrayValueResult.value)
      expect(mapperSpy).toHaveBeenCalledWith(nonArrayValueResult.value)
    })

    it('[ArrayValueResult] should return the mapped value if the condition is met', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => true)
      const mapperSpy = vi.fn<(value: number[]) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = arrayValueResult.errorIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(ErrorResult)
      expect(caughtResult.error?.cause).toBe(arrayValueResult.value)
      expect(conditionSpy).toHaveBeenCalledWith(arrayValueResult.value)
      expect(mapperSpy).toHaveBeenCalledWith(arrayValueResult.value)
    })

    it('[NonArrayValueResult] should default the condition to true', () => {
      // Arrange
      const mapperSpy = vi.fn<(value: number) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = nonArrayValueResult.errorIf(mapperSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(ErrorResult)
      expect(caughtResult.error.cause).toBe(nonArrayValueResult.value)
      expect(mapperSpy).toHaveBeenCalledWith(nonArrayValueResult.value)
    })

    it('[ArrayValueResult] should default the condition to true', () => {
      // Arrange
      const mapperSpy = vi.fn<(value: number[]) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = arrayValueResult.errorIf(mapperSpy)

      // Assert
      expect(caughtResult).toBeInstanceOf(ErrorResult)
      expect(caughtResult.error.cause).toBe(arrayValueResult.value)
      expect(mapperSpy).toHaveBeenCalledWith(arrayValueResult.value)
    })

    it('[NonArrayValueResult] should return itself without mapping if the condition is false', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => false)
      const mapperSpy = vi.fn<(value: number) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = nonArrayValueResult.errorIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBe(nonArrayValueResult)
      expect(conditionSpy).toHaveBeenCalledWith(nonArrayValueResult.value)
      expect(mapperSpy).not.toHaveBeenCalled()
    })

    it('[ArrayValueResult] should return itself without mapping if the condition is false', () => {
      // Arrange
      const conditionSpy = vi.fn<() => boolean>(() => false)
      const mapperSpy = vi.fn<(value: number[]) => Error>(
        (value) => new Error('mapped', { cause: value }),
      )

      // Act
      const caughtResult = arrayValueResult.errorIf(mapperSpy, conditionSpy)

      // Assert
      expect(caughtResult).toBe(arrayValueResult)
      expect(conditionSpy).toHaveBeenCalledWith(arrayValueResult.value)
      expect(mapperSpy).not.toHaveBeenCalled()
    })

    it('[ErrorResult] should return itself', () => {
      // Arrange
      // Act
      const caughtResult = errorResult.errorIf()

      // Assert
      expect(caughtResult).toBe(errorResult)
    })

    // TODO(MOR) move this to a type test with https://bc-tfs.activedirectory.bissantz.de/tfs/DefaultCollection/DeltaMaster/_sprints/taskboard/DeltaMaster%20Team/DeltaMaster/2025/Sprint%2020?workitem=33287
    it('should infer return type is an ErrorResult if no condition is passed', () => {
      // Assert
      // expect type to be ErrorResult
      const result: ErrorResult<Error> = nonArrayValueResult.errorIf(
        () => new Error('Test'),
      )

      expect(result).toBeInstanceOf(ErrorResult)
    })

    // TODO(MOR) move this to a type test with https://bc-tfs.activedirectory.bissantz.de/tfs/DefaultCollection/DeltaMaster/_sprints/taskboard/DeltaMaster%20Team/DeltaMaster/2025/Sprint%2020?workitem=33287
    it('should infer return type is a Result if any condition is passed', () => {
      // Assert
      // @ts-expect-error expect type to be Result
      const errorResult: ErrorResult<Error> = nonArrayValueResult.errorIf(
        () => new Error('Test'),
        () => true,
      )
      // expect type to be Result
      const result: Result<number> = nonArrayValueResult.errorIf(
        () => new Error('Test'),
        () => true,
      )

      expect(errorResult).toBeInstanceOf(ErrorResult)
      expect(result).toBeInstanceOf(ErrorResult)
    })

    it('should work for the general result', () => {
      // Act
      const caughtResult = result.errorIf(
        (value) => new Error('mapped', { cause: value }),
        (_value) => false,
      )

      // Assert
      expect(caughtResult).toBeDefined()
    })
  })

  describe('mapInnerValue', () => {
    it('[ArrayValueResult] should map the inner values', () => {
      // Arrange
      const values = [1, 2, 3]
      const resultUnderTest = new ArrayValueResult(values)
      const mapperSpy = vi.fn<(value: number) => string>(String)

      // Act
      const mappedResult = resultUnderTest.mapInnerValue(mapperSpy)

      // Assert
      expect(mappedResult).toBeInstanceOf(ArrayValueResult)
      expect(mappedResult.value).toStrictEqual(['1', '2', '3'])

      for (let i = 0; i < values.length; i++) {
        const value = values[i]

        expect(mapperSpy).toHaveBeenNthCalledWith(i + 1, value, i, values)
      }
    })

    it('[ErrorResult] should return itself', () => {
      // Assert
      expect(errorResult.mapInnerValue()).toBe(errorResult)
    })

    it('should only be present on Results which have an array type', () => {
      // Arrange
      const arrayResult = createTestResult([3], testError, 'value')
      const nonArrayResult = createTestResult(3, testError, 'value')

      // Act
      // Assert
      expect(arrayResult.mapInnerValue).toBeDefined()
      // @ts-expect-error expect that the method is missing
      expect(nonArrayResult.mapInnerValue).toBeUndefined()
    })
  })

  describe('filterValue', () => {
    it('[ArrayValueResult] should filter the inner values', () => {
      // Arrange
      const values = [1, 2, 3]
      const resultUnderTest = new ArrayValueResult(values)
      const predicateSpy = vi.fn<(value: number) => boolean>(
        (value) => value > 1,
      )

      // Act
      const filteredResult = resultUnderTest.filterValue(predicateSpy)

      // Assert
      expect(filteredResult).toBeInstanceOf(ArrayValueResult)
      expect(filteredResult.value).toStrictEqual([2, 3])

      for (let i = 0; i < values.length; i++) {
        const value = values[i]

        expect(predicateSpy).toHaveBeenNthCalledWith(i + 1, value, i, values)
      }
    })

    it('[ErrorResult] should return itself', () => {
      // Assert
      expect(errorResult.filterValue()).toBe(errorResult)
    })

    it('should only be present on Results which have an array type', () => {
      // Arrange
      const arrayResult = createTestResult([3], testError, 'value')
      const nonArrayResult = createTestResult(3, testError, 'value')

      // Act
      // Assert
      expect(arrayResult.filterValue).toBeDefined()
      // @ts-expect-error expect that the method is missing
      expect(nonArrayResult.filterValue).toBeUndefined()
    })
  })

  describe('filterNarrowValue', () => {
    it('[ArrayValueResult] should filter the inner values', () => {
      // Arrange
      const values = [1, 2, 3]
      const resultUnderTest = new ArrayValueResult(values)
      const predicateSpy = vi.fn<(value: number) => value is number>(
        (value): value is number => value > 1,
      )

      // Act
      const filteredResult = resultUnderTest.filterNarrowValue(
        predicateSpy as never,
      )

      // Assert
      expect(filteredResult).toBeInstanceOf(ArrayValueResult)
      expect(filteredResult.value).toStrictEqual([2, 3])

      for (let i = 0; i < values.length; i++) {
        const value = values[i]

        expect(predicateSpy).toHaveBeenNthCalledWith(i + 1, value, i, values)
      }
    })

    it('[ArrayValueResult] should narrow the type if a predicate is given', () => {
      // Arrange
      const values = [1, undefined]
      const resultUnderTest = createTestResult(
        values,
        new Error('Test'),
        'value',
      )

      // Act
      const filteredResult = resultUnderTest.filterNarrowValue(
        (value): value is number => value != undefined,
      )

      if (filteredResult.isError()) {
        expect.fail('Result is an error')
      }

      // Assert
      expect(filteredResult).toBeInstanceOf(ArrayValueResult)

      // Expect that the type is narrowed to number[]
      const onlyNumbers: number[] = filteredResult.value

      expect(onlyNumbers).toStrictEqual([1])
    })

    it('[ErrorResult] should return itself', () => {
      // Assert
      expect(errorResult.filterNarrowValue()).toBe(errorResult)
    })

    it('should only be present on Results which have an array type', () => {
      // Arrange
      const arrayResult = createTestResult([3], testError, 'value')
      const nonArrayResult = createTestResult(3, testError, 'value')

      // Act
      // Assert
      expect(arrayResult.filterNarrowValue).toBeDefined()
      // @ts-expect-error expect that the method is missing
      expect(nonArrayResult.filterNarrowValue).toBeUndefined()
    })
  })
})
