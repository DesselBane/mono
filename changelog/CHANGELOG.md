# @repo/changelog

## 0.2.0

### Minor Changes

- 75d1fe3: Add new package `@desselbane/setup`

### Patch Changes

- a625004: Eslint fail on warnings
- 075de46: Renovate install tool pnpm. This ensures that pnpm is available for post upgrade tasks.
- 8c26a5b: Ensure `@desselbane/configs` package is built before linting

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6f22c2b: deps: [patch|devDependencies] Update package @turbo/gen from 2.5.4 to 2.5.5
- 4441786: deps: [patch|devDependencies] Update package @types/node from 24.0.10 to 24.0.11
- 4f0092b: deps: [patch|devDependencies] Update package @types/node from 24.0.11 to 24.0.12
- 6bfb1dc: deps: [patch|devDependencies] Update package @types/node from 24.0.12 to 24.0.13
- b64dde0: deps: [patch|devDependencies] Update package @types/node from 24.0.13 to 24.0.14
- 87d2fbe: deps: [minor|devDependencies] Update package eslint from 9.30.1 to 9.31.0
- 1420554: deps: [minor|engines] Update package node from v24.3.0 to v24.4.0
- 53c2e36: deps: [patch|engines] Update package node from v24.4.0 to v24.4.1
- 1420554: deps: [minor|volta] Update package pnpm from 10.12.4 to 10.13.1
- 5a977d2: deps: [patch|action] Update package renovatebot/github-action from v43.0.2 to v43.0.3
- 6f22c2b: deps: [patch|devDependencies] Update package turbo from 2.5.4 to 2.5.5
- a9456ff: deps: Updated lockfile
- a9456ff: deps: Updated lockfile
- a9456ff: deps: Updated lockfile


</details>

## 0.1.0

### Minor Changes

- 7f8328c: Allow setting the log level for manual renovate dispatches
- e220768: Replace `changesets/action@v1` with own steps and `peter-evans/create-pull-request@v7`
- cf70622: Use app to commit versioning and create releases
- 1894533: Set console do not track
- 8f544dc: Run verify workflow on events `pull-request` and `merge_group` to enable merge trains
- 60c4c39: Use custom GitHub app for renovate
- 00ffbeb: Add `NPM_TOKEN` to release workflow
- 27d69ed: Add/Configure Renovate
- f9bd8f2: Add release github workflow
- 704b4d7: Cancel any running verify jobs when new ones start
- d6ebac3: Allow manually triggering the release workflow
- ae69c8a: Enable automerge for patch and minor updates

### Patch Changes

- 54b35d0: Fix lockfile update renovate add changeset
- 76414ec: Migrate renovate config
- a07a64c: Fix release workflow, use branch master instead of main
- e8ea887: Install workspace before lint
- 862b619: Use `pnpm run` to actually run the version script
- 6189de4: Renovate set repository in global config
- 34e1318: Fix verify workflow, ignore master branch instead of main
- 16f3e30: Ignore tsup bundled temp files (like `tsup.config.bundled_ienaten.mjs`)
- 85fa3e5: Allow manually triggering of renovate
- a20b81a: Search in all directories for npm dependencies to update
- df12aea: Fix renovate get token for repo
- 7477b34: Checkout repo in release workflow
- c65bf0d: Add GITHUB_TOKEN to release workflow
- 00c05e0: Auto migrate renovate config
- bf6f33b: Use `git-cli` instead of `github-api` to create the pull request in the release action.
- 6b3671d: Remove `postUpgradeTasks` for the moment
- 7d0fd68: Add permissions contents, pull-requests write to release workflow
- a8f8782: Move npm specific config into npm block

### Dependency Changes

<details>
<summary> Click to expand </summary>

- fc0ecc1: deps: [patch|devDependencies] Update package @types/node from 24.0.3 to 24.0.10
- 1e17843: deps: [major|action] Update package actions/create-github-app-token from v1 to v2
- 133bf18: deps: [minor|devDependencies] Update package eslint from 9.28.0 to 9.30.1
- fc0ecc1: deps: [minor|engines] Update package node from v24.2.0 to v24.3.0
- fc0ecc1: deps: [patch|volta] Update package pnpm from 10.12.1 to 10.12.4
- 266c4de: deps: [minor|devDependencies] Update package prettier from 3.5.3 to 3.6.2
- 9a51349: deps: [major|action] Update package renovatebot/github-action from v42.0.6 to v43.0.2
- 81b22c8: deps: Updated lockfile
- 81b22c8: deps: Updated lockfile
- 81b22c8: deps: Updated lockfile


</details>