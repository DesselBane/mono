# @repo/scripts

## 0.2.4

### Patch Changes

- 313d10b: Fix eslint recommendations

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cc32e17: deps: [minor|devDependencies] Update package @types/node from 24.5.2 to 24.6.0
- 6f8e50d: deps: [patch|devDependencies] Update package @types/node from 24.6.0 to 24.6.1
- e63493a: deps: [patch|devDependencies] Update package @types/node from 24.6.1 to 24.6.2
- a756f63: deps: [minor|devDependencies] Update package @types/node from 24.6.2 to 24.7.0
- fa7b39a: deps: [patch|devDependencies] Update package typescript from 5.9.2 to 5.9.3
- 5cae16a: deps: Updated lockfile
- 61e4a18: deps: Updated lockfile


</details>

## 0.2.3

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
- 03c9b47: deps: [major|devDependencies] Update package type-fest from 4.41.0 to 5.0.0
- c708112: deps: [patch|devDependencies] Update package type-fest from 5.0.0 to 5.0.1
- 12a821f: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- f56fffb: deps: Updated lockfile


</details>

## 0.2.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b4d9ff3: deps: [minor|devDependencies] Update package @types/node from 24.1.0 to 24.2.0
- 341851a: deps: [patch|devDependencies] Update package @types/node from 24.2.0 to 24.2.1
- 36adbe0: deps: Updated lockfile
- 5150293: deps: Updated lockfile


</details>

## 0.2.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e095ed0: deps: [minor|devDependencies] Update package @types/node from 24.0.15 to 24.1.0
- 69bfb72: deps: [minor|devDependencies] Update package typescript from 5.8.3 to 5.9.2
- 93bd1ff: deps: Updated lockfile


</details>

## 0.2.0

### Minor Changes

- fa5a409: Refactor `__mocks__` folders to use `@desselbane/vitest-helpers` package

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 55464ee: deps: [patch|devDependencies] Update package @types/node from 24.0.14 to 24.0.15


</details>

## 0.1.1

### Patch Changes

- a625004: Eslint fail on warnings

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 4441786: deps: [patch|devDependencies] Update package @types/node from 24.0.10 to 24.0.11
- 4f0092b: deps: [patch|devDependencies] Update package @types/node from 24.0.11 to 24.0.12
- 6bfb1dc: deps: [patch|devDependencies] Update package @types/node from 24.0.12 to 24.0.13
- b64dde0: deps: [patch|devDependencies] Update package @types/node from 24.0.13 to 24.0.14
- a9456ff: deps: Updated lockfile


</details>

## 0.1.0

### Minor Changes

- 12041fb: Create version script
- 1b1f171: Add Scripts package
- 76bfd91: Add `renovate-add-changeset` script
- 686ece6: Remove `version.ts` script as its not longer needed.
- 53aeb41: Add `reformat-changelogs` script
- 5a0843e: Detect changeset generated `Updated dependencies` entries and move them to the dependencies section as well.

### Patch Changes

- 54b35d0: Fix lockfile update renovate add changeset
- f0e921a: Remove executable bit from scripts to use changesets action
- a5037e7: Fix renovate-add-changeset. Return `@repo/changelog` if the packageFile is not a JSON file. This happens when the lockfile for the workspace is updated as the packageFile will be pnpm-workspace.yaml
- d916af0: Fix renovate-add-changeset. Exit script if a package.json is found without a name. This happens for the turbo package and generally means it is not a package of the workspace so we can ignore it.
- b139e56: Add tests to `reformat-changelogs`
- b139e56: Remove nested dependency changes sections
- cecc59a: Add executable bit to `renovate-add-changeset.ts` and `version.ts`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- fc0ecc1: deps: [patch|devDependencies] Update package @types/node from 24.0.3 to 24.0.10
- 482acf8: deps: [patch|devDependencies] Update package @vitest/coverage-v8 from 3.2.2 to 3.2.4
- 482acf8: deps: [patch|devDependencies] Update package vitest from 3.2.2 to 3.2.4
- 81b22c8: deps: Updated lockfile


</details>