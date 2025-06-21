# @repo/changelog

## 0.1.0

### Minor Changes

- 1894533: Set console do not track
- ae69c8a: Add Dependabot
- 60c4c39: Use custom GitHub app for renovate
- 27d69ed: Add/Configure Renovate
- f9bd8f2: Add release github workflow
- 704b4d7: Cancel any running verify jobs when new ones start
- ae69c8a: Enable automerge for patch and minor updates

### Patch Changes

- a07a64c: Fix release workflow, use branch master instead of main
- e8ea887: Install workspace before lint
- 6189de4: Renovate set repository in global config
- 34e1318: Fix verify workflow, ignore master branch instead of main
- 85fa3e5: Allow manually triggering of renovate
- a20b81a: Search in all directories for npm dependencies to update
- df12aea: Fix renovate get token for repo
- 7477b34: Checkout repo in release workflow
- c65bf0d: Add GITHUB_TOKEN to release workflow
- 957feef: Pause renovate schedule for the moment
- 00c05e0: Auto migrate renovate config
- bf6f33b: Use `git-cli` instead of `github-api` to create the pull request in the release action.
- 6b3671d: Remove `postUpgradeTasks` for the moment
- c602000: Remove dependabot config
- 7d0fd68: Add permissions contents, pull-requests write to release workflow
- a8f8782: Move npm specific config into npm block
