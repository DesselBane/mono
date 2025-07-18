# @repo/scripts

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