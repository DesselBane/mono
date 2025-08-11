# @desselbane/setup

## 1.0.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 719b83a: deps: [patch|dependencies] Update package @inquirer/prompts from 7.8.0 to 7.8.1
- b4d9ff3: deps: [minor|devDependencies] Update package @types/node from 24.1.0 to 24.2.0
- 341851a: deps: [patch|devDependencies] Update package @types/node from 24.2.0 to 24.2.1
- f319fbc: deps: [patch|devDependencies] Update package tsdown from 0.13.1 to 0.13.2
- 9c686b3: deps: [patch|devDependencies] Update package tsdown from 0.13.2 to 0.13.3
- 8c64366: deps: [patch|devDependencies] Update package tsdown from 0.13.3 to 0.13.4
- 889bf3d: deps: [minor|devDependencies] Update package tsdown from 0.13.4 to 0.14.0
- d5c80c9: deps: [patch|devDependencies] Update package zod from 4.0.14 to 4.0.15
- 719b83a: deps: [patch|devDependencies] Update package zod from 4.0.15 to 4.0.16
- b0e6b84: deps: [patch|devDependencies] Update package zod from 4.0.16 to 4.0.17
- 36adbe0: deps: Updated lockfile
- 5150293: deps: Updated lockfile


</details>

## 1.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 3a6c6bb: deps: [minor|dependencies] Update package @inquirer/prompts from 7.7.1 to 7.8.0
- e095ed0: deps: [minor|devDependencies] Update package @types/node from 24.0.15 to 24.1.0
- be2659f: deps: [minor|devDependencies] Update package tsdown from 0.12.9 to 0.13.0
- df6f8ec: deps: [patch|devDependencies] Update package tsdown from 0.13.0 to 0.13.1
- 69bfb72: deps: [minor|devDependencies] Update package typescript from 5.8.3 to 5.9.2
- a4dc62e: deps: [patch|devDependencies] Update package zod from 4.0.10 to 4.0.11
- 552d09f: deps: [patch|devDependencies] Update package zod from 4.0.11 to 4.0.13
- 46bfab5: deps: [patch|devDependencies] Update package zod from 4.0.13 to 4.0.14
- 0f85495: deps: [patch|devDependencies] Update package zod from 4.0.5 to 4.0.8
- 2e29a87: deps: [patch|devDependencies] Update package zod from 4.0.8 to 4.0.9
- ef9cf5b: deps: [patch|devDependencies] Update package zod from 4.0.9 to 4.0.10
- 93bd1ff: deps: Updated lockfile


</details>

## 1.0.0

### Major Changes

- 834fac3: Initial Release

### Minor Changes

- e654fc6: Add support for winget DSC configurations.
- fa5a409: Refactor `__mocks__` folders to use `@desselbane/vitest-helpers` package
- 834fac3: Add support for installing VS Code extensions
- 36dceeb: Do not install Elgato StreamDeck software by default.
- 36dceeb: Add `Loupedeck` as default installed program
- 36dceeb: Update `WingetId` of `Region to Share` to be `TomEnglert.RegionToShare`

### Patch Changes

- 834fac3: Make all top level confirm prompts default to false. This way a user does not install anything by accident.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- fe5f45a: deps: [pin|dependencies] Update package @inquirer/prompts from 7.6.0 to 7.6.0
- 945f4b4: deps: [minor|dependencies] Update package @inquirer/prompts from 7.6.0 to 7.7.1
- 9ed9a76: deps: [patch|devDependencies] Update package @types/node from 24.0.12 to 24.0.14
- 55464ee: deps: [patch|devDependencies] Update package @types/node from 24.0.14 to 24.0.15
- d19983f: deps: [patch|devDependencies] Update package zod from 4.0.2 to 4.0.5


</details>

## 0.1.0

### Minor Changes

- b2198d3: Add setup dotConfig capabilities
- 75d1fe3: Add new package `@desselbane/setup`
- 1cc53dd: Add packages
- 1cc53dd: Add a local `read-package-list` script which reads winget for installed packages and outputs a every package not found in the current package list.
- 0d72838: Install windows apps via `winget`
- b2198d3: Automatically elevate privileges at the beginning
- 7ff5f70: Sort and group installable packages

### Patch Changes

- 78c7ada: Refactor main script into one file per task