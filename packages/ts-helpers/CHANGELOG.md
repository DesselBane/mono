# @desselbane/ts-helpers

## 5.0.0

### Major Changes

- 286c261: Rename `keylikeToString` into `propertyKeyToString` and use ts native `PropertyKey` type instead of custom type.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 07f989a: deps: [minor|devDependencies] Update package @types/node from 24.2.1 to 24.3.0
- d9f1876: deps: [patch|devDependencies] Update package @types/node from 24.3.0 to 24.3.1
- 908e130: deps: [patch|devDependencies] Update package @types/node from 24.3.1 to 24.3.2
- eac00a2: deps: [patch|devDependencies] Update package @types/node from 24.3.2 to 24.3.3
- 985254d: deps: [minor|devDependencies] Update package @types/node from 24.3.3 to 24.4.0
- 2f9cefa: deps: [minor|devDependencies] Update package @types/node from 24.4.0 to 24.5.0
- 29353de: deps: [patch|devDependencies] Update package @types/node from 24.5.0 to 24.5.1
- 6c1e1d4: deps: [patch|devDependencies] Update package @types/node from 24.5.1 to 24.5.2
- 5114890: deps: [patch|devDependencies] Update package tsdown from 0.14.0 to 0.14.1
- af7996f: deps: [patch|devDependencies] Update package tsdown from 0.14.1 to 0.14.2
- 91638f3: deps: [minor|devDependencies] Update package tsdown from 0.14.2 to 0.15.0
- 37e00ee: deps: [patch|devDependencies] Update package tsdown from 0.15.0 to 0.15.1
- 324e549: deps: [patch|devDependencies] Update package tsdown from 0.15.1 to 0.15.2
- a1eda12: deps: [patch|devDependencies] Update package tsdown from 0.15.2 to 0.15.3
- 9838346: deps: [patch|devDependencies] Update package tsdown from 0.15.3 to 0.15.4
- 03c9b47: deps: [major|devDependencies] Update package type-fest from 4.41.0 to 5.0.0
- c708112: deps: [patch|devDependencies] Update package type-fest from 5.0.0 to 5.0.1
- 09e8bd1: deps: [patch|devDependencies] Update package unplugin-unused from 0.5.1 to 0.5.2
- d68ef20: deps: [patch|devDependencies] Update package unplugin-unused from 0.5.2 to 0.5.3
- 12a821f: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- f56fffb: deps: Updated lockfile


</details>

## 4.1.0

### Minor Changes

- b1a01be: Add `isKeyOf` and `assertKeyOf` helpers

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b4d9ff3: deps: [minor|devDependencies] Update package @types/node from 24.1.0 to 24.2.0
- 341851a: deps: [patch|devDependencies] Update package @types/node from 24.2.0 to 24.2.1
- f319fbc: deps: [patch|devDependencies] Update package tsdown from 0.13.1 to 0.13.2
- 9c686b3: deps: [patch|devDependencies] Update package tsdown from 0.13.2 to 0.13.3
- 8c64366: deps: [patch|devDependencies] Update package tsdown from 0.13.3 to 0.13.4
- 889bf3d: deps: [minor|devDependencies] Update package tsdown from 0.13.4 to 0.14.0
- 36adbe0: deps: Updated lockfile
- 5150293: deps: Updated lockfile


</details>

## 4.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e095ed0: deps: [minor|devDependencies] Update package @types/node from 24.0.15 to 24.1.0
- be2659f: deps: [minor|devDependencies] Update package tsdown from 0.12.9 to 0.13.0
- df6f8ec: deps: [patch|devDependencies] Update package tsdown from 0.13.0 to 0.13.1
- 69bfb72: deps: [minor|devDependencies] Update package typescript from 5.8.3 to 5.9.2
- 93bd1ff: deps: Updated lockfile


</details>

## 4.0.0

### Major Changes

- 261a08e: Move function `noop` from package `@desselbane/ts-helpers` to `@desselbane/vitest-helpers`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 55464ee: deps: [patch|devDependencies] Update package @types/node from 24.0.14 to 24.0.15


</details>

## 3.1.0

### Minor Changes

- cb5c173: Migrate build system from `tsup` to `tsdown`. This enables faster build times and declaration maps which greatly helps in the mono repo
- b1cfc44: Export type `SafeReturn<TValue>`, `SafeTryReturnData<TValue>` and `SafeTryReturnError`
- cf46467: Enhance `safeTryAsync`. Allow passing a promise in addition to a function which returns a promise.
- 104b649: Enhance `safeTry`/`safeTryAsync`. Add an object variant to the return type.

  Now you can also access the values like this:

  ```typescript
  const { error, data } = safeTry(() => myBadFunction())
  const { error, data } = await safeTryAsync(() => myBadPromise())
  ```

### Patch Changes

- a625004: Eslint fail on warnings
- 5a37d9f: Fix `safeTry` and `safeTryAsync` do not throw if null or undefined is returned by the function.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 4441786: deps: [patch|devDependencies] Update package @types/node from 24.0.10 to 24.0.11
- 4f0092b: deps: [patch|devDependencies] Update package @types/node from 24.0.11 to 24.0.12
- 6bfb1dc: deps: [patch|devDependencies] Update package @types/node from 24.0.12 to 24.0.13
- b64dde0: deps: [patch|devDependencies] Update package @types/node from 24.0.13 to 24.0.14
- a9456ff: deps: Updated lockfile


</details>

## 3.0.0

### Major Changes

- 8987763: Update scope from private `@repo` to public `@desselbane`

### Minor Changes

- 22b1bd4: Add kebabCase helper function

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 12cc633: deps(patch): Update package @types/node from 22.15.30 to 22.15.30
- 12cc633: deps(patch): Update package vitest from 3.2.0 to 3.2.2
- 12cc633: deps(patch): Update package @vitest/coverage-v8 from 3.2.0 to 3.2.2
- 12cc633: deps: Updated lockfile
- fc0ecc1: deps: [minor|devDependencies] Update package @types/node from 22.15.32 to 22.16.0
- d53be68: deps: [major|devDependencies] Update package @types/node from 22.15.32 to 24.0.10
- 81b22c8: deps: Updated lockfile


</details>

## 2.0.0

### Major Changes

- ad6243a: Change `assertionContext` to be of type `UnknownRecord`
- dd598fa: Fixed typo in `isNillOrWhitespace` => `isNilOrWhitespace`
- a8a34ba: Move `async` variant of `safeTry` into `safeTryAsync` as the generated types did not work and it was a lot of complexity. If you have used `await safeTry(()=>something)` you should now write it as `await safeTryAsync(()=>something)`
- dd598fa: `safe-try`: Replace `null` with `undefined` in all type signatures

### Minor Changes

- 0524494: Add `assertIsString` assertion function.
- 0524494: Add `assertIsNullableString` assertion function
- ad6243a: Add `assertNil` assertion function. This function will assert that a value is nullish.
- 960ae56: Add `waitAsync` helper function.

  `waitAsync` creates a promise which waits for the specified amount of milliseconds before it resolves

  Example

  ```typescript
  it('should wait 10ms', async () => {
    await waitAsync(10)
  })
  ```

- f8fd34d: Add `finallyForMaybePromise` helper function.

  Ensure that a finally callback is run after a work item without knowing if the work item is a promise or not. \
  `potentiallyThrowingCallback`: The callback which might throw and might return a promise \
  `finallyCallback`: The cleanup callback to be run after the work item

  Example:

  ```typescript
  function wrapper<TInput extends unknown[], TOutput>(
    target: (...input: TInput) => TOutput,
  ): (...input: TInput) => TOutput {
    return function (...input: TInput) {
      console.log('This is logged before the target is called')
      return finallyForMaybePromise(
        () => target(...input),
        () => {
          console.log(
            'This is logged after the target completed and if it was a promise it is awaited first',
          )
        },
      )
    }
  }
  ```

- c8c542f: Add `propertyKeyToString` helper.

  ```typescript
  export function propertyKeyToString(
    keylike: string | symbol | number,
    symbolDefaultValue = 'unknown symbol',
  ): string
  ```

  Converts a keylike value into string for easy logging \
  `keylike`: The value to be converted \
  `symbolDefaultValue`: A default value in case keylike is a symbol without description

  Example:

  ```typescript
  function logValueOfObject<TTarget extends object>(
    target: TTarget,
    key: keyof TTarget,
  ) {
    const keyNameError: string = key // Error TS2322: Type string | number | symbol is not assignable to type string
    const keyName: string = propertyKeyToString(
      key,
      'Symbol without description',
    ) // Works

    console.log(`Value of ${keyName} is ${String(target[key])}`)
  }
  ```

### Patch Changes

- 8b575a9: Fix package url. This should display changelogs in renovate.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 3d997d6: deps(minor): Update package tsup from 8.5.0 to 8.5.0
- e2c91ef: deps(minor): Update package type-fest from 4.39.1 to 4.41.0
- df36dd6: deps(minor): Update package @types/node from 22.7.8 to 22.15.29
- 291257a: deps(patch): Update package typescript from 5.8.2 to 5.8.3
- 4757606: deps(patch): Update package vitest from 3.1.1 to 3.1.4
- 0e9b65f: deps(patch): Update package @vitest/coverage-v8 from 3.1.1 to 3.1.4
- 776bdc5: deps: Updated lockfile
- 512461e: deps: Updated lockfile
- 6b26c2e: deps: Updated lockfile
- ab59d2c: deps: Updated lockfile
- c2fe4e8: deps: Updated lockfile
- ea663cf: deps: Updated lockfile
- eddbb5d: deps: Updated lockfile
- 1b989b0: deps: Updated lockfile


</details>

## 2.0.0-next.7

### Major Changes

- dd598fa: Fixed typo in `isNillOrWhitespace` => `isNilOrWhitespace`
- dd598fa: `safe-try`: Replace `null` with `undefined` in all type signatures

## 1.0.2-next.6

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 5fa9cc9: deps(minor): Update package @types/node from 22.7.8 to 22.15.3


</details>

## 1.0.2-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 5ec777b: deps(patch): Update package type-fest from 4.40.0 to 4.40.1
- 6b26c2e: deps: Updated lockfile
- ab59d2c: deps: Updated lockfile


</details>

## 1.0.2-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 518362b: deps(patch): Update package vitest from 3.1.1 to 3.1.2
- 5c6a504: deps(patch): Update package @vitest/coverage-v8 from 3.1.1 to 3.1.2


</details>

## 1.0.2-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 9061150: deps(minor): Update package type-fest from 4.39.1 to 4.40.0
- 512461e: deps: Updated lockfile


</details>

## 1.0.2-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 776bdc5: deps: Updated lockfile


</details>

## 1.0.2-next.1

### Patch Changes

- 8b575a9: Fix package url. This should display changelogs in renovate.

## 1.0.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 291257a: deps(patch): Update package typescript from 5.8.2 to 5.8.3


</details>

## 1.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af84e3a: deps(minor): Update package type-fest from 4.38.0 to 4.39.0
- 5114615: deps(patch): Update package type-fest from 4.39.0 to 4.39.1
- e3f3a2e: deps: Updated lockfile


</details>

## 1.0.0

### Major Changes

- 7bb96f8: Initial Release of the "@desselbane/ts-helpers" package. It contains typescript helpers which are domain agnostic.

### Patch Changes

- f36576c: Fix publish config.
- 7bb96f8: Rename from "@desselbane/ts-helpers" to "@desselbane/ts-helpers"

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ac02be0: deps(minor): Update package vitest from 3.0.9 to 3.1.1
- f3fc4dc: deps(minor): Update package @vitest/coverage-v8 from 3.0.9 to 3.1.1


</details>

## 1.0.0-next.0

### Major Changes

- 7bb96f8: Initial Release of the "@desselbane/ts-helpers" package. It contains typescript helpers which are domain agnostic.

### Patch Changes

- f36576c: Fix publish config.
- 7bb96f8: Rename from "@desselbane/ts-helpers" to "@desselbane/ts-helpers"

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ac02be0: deps(minor): Update package vitest from 3.0.9 to 3.1.1
- f3fc4dc: deps(minor): Update package @vitest/coverage-v8 from 3.0.9 to 3.1.1


</details>

## 0.6.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- db04546: deps(minor): Update package type-fest from 4.37.0 to 4.38.0
- 501554c: deps: Updated lockfile


</details>

## 0.6.5-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- db04546: deps(minor): Update package type-fest from 4.37.0 to 4.38.0
- 501554c: deps: Updated lockfile


</details>

## 0.6.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 392f722: deps(patch): Update package vitest from 3.0.8 to 3.0.9
- d9f3b4e: deps(patch): Update package @vitest/coverage-v8 from 3.0.8 to 3.0.9
- 3c7503e: deps: Updated lockfile


</details>

## 0.6.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ce3cdd3: deps(minor): Update package type-fest from 4.36.0 to 4.37.0
- 01847dc: deps(patch): Update package vitest from 3.0.6 to 3.0.8
- 959b360: deps(patch): Update package @vitest/coverage-v8 from 3.0.7 to 3.0.8
- 0073852: deps: Updated lockfile
- 3b1f91c: deps: Updated lockfile


</details>

## 0.6.3-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ce3cdd3: deps(minor): Update package type-fest from 4.36.0 to 4.37.0
- 959b360: deps(patch): Update package @vitest/coverage-v8 from 3.0.7 to 3.0.8
- 0073852: deps: Updated lockfile
- 3b1f91c: deps: Updated lockfile


</details>

## 0.6.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- d24e347: deps(minor): Update package tsup from 8.3.6 to 8.4.0
- bc18d41: deps(minor): Update package type-fest from 4.34.1 to 4.35.0
- dde854c: deps(minor): Update package type-fest from 4.35.0 to 4.36.0
- 5082310: deps(minor): Update package typescript from 5.7.3 to 5.8.2
- 4dc8e96: deps(patch): Update package vitest from 3.0.5 to 3.0.6
- 8bc2f15: deps(patch): Update package @vitest/coverage-v8 from 3.0.5 to 3.0.6
- 899adc9: deps(patch): Update package @vitest/coverage-v8 from 3.0.6 to 3.0.7
- 107fd8f: deps: Updated lockfile
- 026188c: deps: Updated lockfile
- 09c7357: deps: Updated lockfile


</details>

## 0.6.2-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- dde854c: deps(minor): Update package type-fest from 4.35.0 to 4.36.0


</details>

## 0.6.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- d24e347: deps(minor): Update package tsup from 8.3.6 to 8.4.0
- bc18d41: deps(minor): Update package type-fest from 4.34.1 to 4.35.0
- 5082310: deps(minor): Update package typescript from 5.7.3 to 5.8.2
- 4dc8e96: deps(patch): Update package vitest from 3.0.5 to 3.0.6
- 8bc2f15: deps(patch): Update package @vitest/coverage-v8 from 3.0.5 to 3.0.6
- 899adc9: deps(patch): Update package @vitest/coverage-v8 from 3.0.6 to 3.0.7
- 107fd8f: deps: Updated lockfile
- 026188c: deps: Updated lockfile
- 09c7357: deps: Updated lockfile


</details>

## 0.6.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 11b5840: deps(minor): Update package type-fest from 4.33.0 to 4.34.1
- 73a50c0: deps(patch): Update package vitest from 3.0.4 to 3.0.5
- 9f7e4cd: deps(patch): Update package @vitest/coverage-v8 from 3.0.4 to 3.0.5
- 0906d09: deps: Updated lockfile


</details>

## 0.6.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 11b5840: deps(minor): Update package type-fest from 4.33.0 to 4.34.1


</details>

## 0.6.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 9f7e4cd: deps(patch): Update package @vitest/coverage-v8 from 3.0.4 to 3.0.5
- 0906d09: deps: Updated lockfile


</details>

## 0.6.0

### Minor Changes

- 63d6012: Add the `safeTry` helper function.

  With this any error thrown in the passed callback will be caught and returned as a tuple. It removes the need for a `try/catch` block and makes error handling very similar to languages like golang or rust.

  Example:

  ```ts
  const [error, data] = safeTry(maybeThrowingFunction)
  if (error != null) {
    console.error('ups')
    return error
  }

  doSomethingWith(data)
  ```

### Patch Changes

- 39230a1: Fix repository field in package.json

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 46254c4: deps(patch): Update package tsup from 8.3.5 to 8.3.6
- 6877cf1: deps(minor): Update package type-fest from 4.32.0 to 4.33.0
- bf07edf: deps(patch): Update package vitest from 3.0.2 to 3.0.3
- 88994d8: deps(patch): Update package vitest from 3.0.3 to 3.0.4
- e07c00b: deps: Updated lockfile
- eca6687: deps: Updated lockfile


</details>

## 0.6.0-next.5

### Minor Changes

- 63d6012: Add the `safeTry` helper function.

  With this any error thrown in the passed callback will be caught and returned as a tuple. It removes the need for a `try/catch` block and makes error handling very similar to languages like golang or rust.

  Example:

  ```ts
  const [error, data] = safeTry(maybeThrowingFunction)
  if (error != null) {
    console.error('ups')
    return error
  }

  doSomethingWith(data)
  ```

## 0.5.2-next.4

### Patch Changes

- 39230a1: Fix repository field in package.json

### Dependency Changes

<details>
<summary> Click to expand </summary>

- eca6687: deps: Updated lockfile


</details>

## 0.5.2-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 46254c4: deps(patch): Update package tsup from 8.3.5 to 8.3.6


</details>

## 0.5.2-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 88994d8: deps(patch): Update package vitest from 3.0.3 to 3.0.4
- e07c00b: deps: Updated lockfile


</details>

## 0.5.2-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- bf07edf: deps(patch): Update package vitest from 3.0.2 to 3.0.3


</details>

## 0.5.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6877cf1: deps(minor): Update package type-fest from 4.32.0 to 4.33.0


</details>

## 0.5.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 32294d3: deps(major): Update package vitest from 2.1.8 to 3.0.1
- 9e47a6b: deps(patch): Update package vitest from 3.0.1 to 3.0.2
- 68ff813: deps: Updated lockfile


</details>

## 0.5.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 32294d3: deps(major): Update package vitest from 2.1.8 to 3.0.1
- 9e47a6b: deps(patch): Update package vitest from 3.0.1 to 3.0.2
- 68ff813: deps: Updated lockfile


</details>

## 0.5.0

### Minor Changes

- 859a666: Add lazy helper

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 637da6f: deps(minor): Update package type-fest from 4.30.1 to 4.31.0
- e2a30d1: deps(minor): Update package type-fest from 4.31.0 to 4.32.0
- 1391225: deps(patch): Update package typescript from 5.7.2 to 5.7.3
- 93dafe5: deps: Updated lockfile


</details>

## 0.5.0-next.1

### Minor Changes

- 859a666: Add lazy helper

## 0.4.3-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 637da6f: deps(minor): Update package type-fest from 4.30.1 to 4.31.0
- e2a30d1: deps(minor): Update package type-fest from 4.31.0 to 4.32.0
- 1391225: deps(patch): Update package typescript from 5.7.2 to 5.7.3
- 93dafe5: deps: Updated lockfile


</details>

## 0.4.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 33e64af: deps: Updated lockfile
- 03831e1: deps: Updated lockfile
- 1f29167: deps: Updated lockfile


</details>

## 0.4.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 33e64af: deps: Updated lockfile
- 03831e1: deps: Updated lockfile
- 1f29167: deps: Updated lockfile


</details>

## 0.4.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 7d51325: deps(minor): Update package typescript from 5.6.3 to 5.7.2


</details>

## 0.4.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 7d51325: deps(minor): Update package typescript from 5.6.3 to 5.7.2


</details>

## 0.4.0

### Minor Changes

- a69a587: Allow assertNotNil to have a custom message

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 2421633: deps(minor): Update package type-fest from 4.27.1 to 4.28.0
- de21179: deps(patch): Update package type-fest from 4.28.0 to 4.28.1
- 93955df: deps(minor): Update package type-fest from 4.28.1 to 4.29.0
- 3e06182: deps(patch): Update package type-fest from 4.29.0 to 4.29.1
- 9f4b2c0: deps(minor): Update package type-fest from 4.29.1 to 4.30.0
- 38d027b: deps(patch): Update package type-fest from 4.30.0 to 4.30.1
- adbc395: deps(patch): Update package vitest from 2.1.5 to 2.1.6
- d0a04e1: deps(patch): Update package vitest from 2.1.6 to 2.1.8
- 4050981: deps: Updated lockfile
- 84b60a3: deps: Updated lockfile
- bb04fab: deps: Updated lockfile


</details>

## 0.4.0-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 3e06182: deps(patch): Update package type-fest from 4.29.0 to 4.29.1
- 9f4b2c0: deps(minor): Update package type-fest from 4.29.1 to 4.30.0
- d0a04e1: deps(patch): Update package vitest from 2.1.6 to 2.1.8
- 84b60a3: deps: Updated lockfile


</details>

## 0.4.0-next.1

### Minor Changes

- a69a587: Allow assertNotNil to have a custom message

## 0.3.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 2421633: deps(minor): Update package type-fest from 4.27.1 to 4.28.0
- de21179: deps(patch): Update package type-fest from 4.28.0 to 4.28.1
- 93955df: deps(minor): Update package type-fest from 4.28.1 to 4.29.0
- adbc395: deps(patch): Update package vitest from 2.1.5 to 2.1.6
- 4050981: deps: Updated lockfile


</details>

## 0.3.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ac51137: deps(patch): Update package type-fest from 4.27.0 to 4.27.1


</details>

## 0.3.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ac51137: deps(patch): Update package type-fest from 4.27.0 to 4.27.1


</details>

## 0.3.0

### Minor Changes

- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Explicitly export types
- 4365475: Add `noop` function to stub out callbacks in tests.
- 4365475: Add `createCircularReferenceReplacer`.

  This function creates a replacer function which can be use with JSON.stringify. The created replacer replaces all circular references with the string `<circular Reference removed>`.

  Example:

  ```js
  const foo = {
    bar: null,
  }
  foo.bar = {
    foo,
  }

  const serialize = () =>
    JSON.stringify({ foo }, createCircularReferenceReplacer())

  expect(JSON.parse(serialize())).toMatchObject({
    foo: {
      bar: {
        foo: '<circular Reference removed>',
      },
    },
  })
  ```

- 4365475: Add assertion utils `assertNotNil` and `assertPropsNotNil`.
- 4365475: Add `createErrorReplacer`.

  This function replaces Error objects with plain objects that contain the `name`, `message`, `stack` and `cause` properties of the error otherwise Error objects will be stringified as `{}`

  Example:

  ```typescript
  const reparsedError = JSON.parse(JSON.stringify(error, createErrorReplacer()))

  expect(reparsedError.name).toBe('Error')
  expect(reparsedError.message).toBe('foo')
  expect(reparsedError.stack.length).toBeGreaterThan(0)
  expect(reparsedError.cause).toBe('bar')
  ```

- 4365475: Add assertions `isNilOrWhitespace`.

### Patch Changes

- 4365475: Pipeline: Do not trigger multiple pipelines on pre release

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 7f31da5: deps(patch): Update package tsup from 8.3.0 to 8.3.5
- c5c38cc: deps(minor): Update package type-fest from 4.26.1 to 4.27.0
- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile
- cdf2c06: deps: Updated lockfile


</details>

## 0.3.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cdf2c06: deps: Updated lockfile


</details>

## 0.3.0-next.4

### Minor Changes

- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Explicitly export types

### Dependency Changes

<details>
<summary> Click to expand </summary>

- c5c38cc: deps(minor): Update package type-fest from 4.26.1 to 4.27.0


</details>

## 0.3.0-next.3

### Minor Changes

- 4365475: Add `noop` function to stub out callbacks in tests.
- 4365475: Add `createCircularReferenceReplacer`.

  This function creates a replacer function which can be use with JSON.stringify. The created replacer replaces all circular references with the string `<circular Reference removed>`.

  Example:

  ```js
  const foo = {
    bar: null,
  }
  foo.bar = {
    foo,
  }

  const serialize = () =>
    JSON.stringify({ foo }, createCircularReferenceReplacer())

  expect(JSON.parse(serialize())).toMatchObject({
    foo: {
      bar: {
        foo: '<circular Reference removed>',
      },
    },
  })
  ```

- 4365475: Add assertion utils `assertNotNil` and `assertPropsNotNil`.
- 4365475: Add `createErrorReplacer`.

  This function replaces Error objects with plain objects that contain the `name`, `message`, `stack` and `cause` properties of the error otherwise Error objects will be stringified as `{}`

  Example:

  ```typescript
  const reparsedError = JSON.parse(JSON.stringify(error, createErrorReplacer()))

  expect(reparsedError.name).toBe('Error')
  expect(reparsedError.message).toBe('foo')
  expect(reparsedError.stack.length).toBeGreaterThan(0)
  expect(reparsedError.cause).toBe('bar')
  ```

- 4365475: Add assertions `isNilOrWhitespace`.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile


</details>

## 0.2.2-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 7f31da5: deps(patch): Update package tsup from 8.3.0 to 8.3.5


</details>

## 0.2.2-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4


</details>

## 0.2.2-next.0

### Patch Changes

- 3b4a1b9: Pipeline: Do not trigger multiple pipelines on pre release

## 0.2.1

### Patch Changes

- 0ec887f: Pipeline: Git Tags now reference the correct commit instead of the one before.

## 0.2.1-next.0

### Patch Changes

- 0ec887f: Pipeline: Git Tags now reference the correct commit instead of the one before.

## 0.2.0

### Minor Changes

- 13ca7c7: Add isIncluded helper.

  Check if a value is part of an array of type TValue[]. If so inform typescript that value must be of type TValue.

  ```ts
  const SUPPORTED_LOCALES = ['en-US', 'en-PT'] as const
  const maybeLocale: string = 'en-US'
  // This will error since string can not be part of a ('en-US' | 'en-PT')[] array.
  if (!SUPPORTED_LOCALES.includes(maybeLocale)) {
    // Do some default handling
  }
  if (isIncluded(SUPPORTED_LOCALES, maybeLocale)) {
    // TS now understands that maybeLocale is of type 'en-US' | 'en-PT'
  } else {
    // Do some default handling
  }
  ```

- 13ca7c7: Initial Release