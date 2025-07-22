# @desselbane/setup

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