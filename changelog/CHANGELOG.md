# @repo/changelog

## 0.5.0

### Minor Changes

- 8b1d76d: Use new pnpm/setup action instead of pnpm/action-setup and actions/setup-node@v7

## 0.4.1

### Patch Changes

- 1f8572c: Add trailing slash to registry url

## 0.4.0

### Minor Changes

- 5513a7d: Set `minimumReleaseAge` to `1 day` for renovate
- 47e645b: set allowShellExecutorForPostUpgradeCommands true

### Patch Changes

- 7719137: Use `includeIgnoreFile` from `@eslint/config-helpers`
- 9e26c7c: Update lockfile
- 402e845: Use client-id instead of app-id in actions/create-github-app-token@v3 workflows
- 9e26c7c: Update pnpm allowBuilds
- 1e62875: Disable major updates for `@types/node`
- 24161d1: Update renovate `lockFileMaintenance` config
- 731748c: Turn off formatting for changesets
- 9e26c7c: Only pin `npm` dependencies
- 306980a: Use `pnpm ci` instead of `pnpm install`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 9e26c7c: deps: Updated lockfile
- db54b62: deps: Updated lockfile
- 990247a: deps: [patch|devDependencies] Update package @changesets/cli from 2.29.7 to 2.29.8
- 97b11d9: deps: [minor|devDependencies] Update package @changesets/cli from 2.29.8 to 2.30.0
- 97b11d9: deps: [minor|devDependencies] Update package @changesets/cli from 2.30.0 to 2.31.0
- 990247a: deps: [patch|devDependencies] Update package @changesets/cli from 2.31.0 to 2.31.1
- 72a29a3: deps: [major|devDependencies] Update package @changesets/cli from 2.31.1 to 3.0.0
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.0 to 2.10.1
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.1 to 2.10.2
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.2 to 2.10.3
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.3 to 2.10.4
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.4 to 2.10.5
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.5 to 2.10.6
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.6 to 2.10.7
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.7 to 2.10.8
- 23f78f6: deps: [patch|devDependencies] Update package @turbo/gen from 2.10.8 to 2.10.9
- c4d5db2: deps: [patch|devDependencies] Update package @turbo/gen from 2.6.0 to 2.6.1
- c4d5db2: deps: [patch|devDependencies] Update package @turbo/gen from 2.6.1 to 2.6.2
- c4d5db2: deps: [patch|devDependencies] Update package @turbo/gen from 2.6.2 to 2.6.3
- 2ede514: deps: [minor|devDependencies] Update package @turbo/gen from 2.6.3 to 2.7.0
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.0 to 2.7.1
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.1 to 2.7.2
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.2 to 2.7.3
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.3 to 2.7.4
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.4 to 2.7.5
- 3b7a3a9: deps: [patch|devDependencies] Update package @turbo/gen from 2.7.5 to 2.7.6
- b01de16: deps: [minor|devDependencies] Update package @turbo/gen from 2.7.6 to 2.8.0
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.0 to 2.8.1
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.1 to 2.8.2
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.10 to 2.8.11
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.11 to 2.8.12
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.12 to 2.8.13
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.13 to 2.8.14
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.14 to 2.8.15
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.15 to 2.8.16
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.16 to 2.8.17
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.17 to 2.8.18
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.18 to 2.8.19
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.19 to 2.8.20
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.2 to 2.8.3
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.20 to 2.8.21
- 4d11b80: deps: [minor|devDependencies] Update package @turbo/gen from 2.8.21 to 2.9.1
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.3 to 2.8.4
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.4 to 2.8.5
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.5 to 2.8.6
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.6 to 2.8.7
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.7 to 2.8.8
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.8 to 2.8.9
- 47f1730: deps: [patch|devDependencies] Update package @turbo/gen from 2.8.9 to 2.8.10
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.1 to 2.9.3
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.10 to 2.9.11
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.11 to 2.9.12
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.12 to 2.9.14
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.14 to 2.9.15
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.15 to 2.9.16
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.16 to 2.9.17
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.17 to 2.9.18
- eeafe09: deps: [minor|devDependencies] Update package @turbo/gen from 2.9.18 to 2.10.0
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.3 to 2.9.4
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.4 to 2.9.5
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.5 to 2.9.6
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.6 to 2.9.7
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.7 to 2.9.8
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.8 to 2.9.9
- c56ad4d: deps: [patch|devDependencies] Update package @turbo/gen from 2.9.9 to 2.9.10
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.0 to 24.10.1
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.1 to 24.10.2
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.10 to 24.10.11
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.11 to 24.10.12
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.12 to 24.10.13
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.13 to 24.10.14
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.14 to 24.10.15
- e621ca7: deps: [minor|devDependencies] Update package @types/node from 24.10.15 to 24.11.0
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.2 to 24.10.3
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.3 to 24.10.4
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.4 to 24.10.6
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.6 to 24.10.7
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.7 to 24.10.8
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.8 to 24.10.9
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.9 to 24.10.10
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.11.0 to 24.11.2
- e621ca7: deps: [minor|devDependencies] Update package @types/node from 24.11.2 to 24.12.0
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.12.0 to 24.12.2
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.12.2 to 24.12.3
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.12.3 to 24.12.4
- e621ca7: deps: [minor|devDependencies] Update package @types/node from 24.12.4 to 24.13.0
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.13.0 to 24.13.1
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.13.1 to 24.13.2
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.13.2 to 24.13.3
- 108e9f4: deps: [major|action] Update package actions/cache from v4 to v5
- 5e1b399: deps: [major|action] Update package actions/cache from v5.0.5 to v6.0.0
- b795acf: deps: [major|action] Update package actions/checkout from v5 to v6
- aa9f0d3: deps: [major|action] Update package actions/checkout from v6.0.3 to v7
- af53aad: deps: [major|action] Update package actions/create-github-app-token from v2 to v3
- 0acbc3e: deps: [major|action] Update package actions/setup-node from v6.5.0 to v7.0.0
- eb2d585: deps: [minor|devDependencies] Update package eslint from 10.0.3 to 10.1.0
- 9f016c9: deps: [minor|devDependencies] Update package eslint from 10.1.0 to 10.2.0
- 2af3b5e: deps: [patch|devDependencies] Update package eslint from 10.2.0 to 10.2.1
- a368c35: deps: [minor|devDependencies] Update package eslint from 10.2.1 to 10.3.0
- 783fb9b: deps: [minor|devDependencies] Update package eslint from 10.3.0 to 10.4.0
- 6ae4569: deps: [patch|devDependencies] Update package eslint from 10.4.0 to 10.4.1
- 4198608: deps: [minor|devDependencies] Update package eslint from 10.4.1 to 10.5.0
- ec476ed: deps: [minor|devDependencies] Update package eslint from 10.5.0 to 10.6.0
- eef5b96: deps: [minor|devDependencies] Update package eslint from 10.6.0 to 10.7.0
- 3b6fee3: deps: [minor|devDependencies] Update package eslint from 10.7.0 to 10.8.0
- 99d6743: deps: [patch|devDependencies] Update package eslint from 10.8.0 to 10.8.1
- 3f2de43: deps: [patch|devDependencies] Update package eslint from 9.39.1 to 9.39.2
- 1b01a4a: deps: [patch|devDependencies] Update package eslint from 9.39.2 to 9.39.3
- 1c2c01f: deps: [patch|devDependencies] Update package eslint from 9.39.3 to 9.39.4
- 50d52e6: deps: [major|devDependencies] Update package eslint from 9.39.4 to 10.0.3
- 1ebf8a9: deps: [patch|devDependencies] Update package lint-staged from 16.2.6 to 16.2.7
- f476406: deps: [minor|devDependencies] Update package lint-staged from 16.2.7 to 16.3.0
- 1ebf8a9: deps: [patch|devDependencies] Update package lint-staged from 16.3.0 to 16.3.1
- 1ebf8a9: deps: [patch|devDependencies] Update package lint-staged from 16.3.1 to 16.3.2
- 1ebf8a9: deps: [patch|devDependencies] Update package lint-staged from 16.3.2 to 16.3.3
- 1ebf8a9: deps: [patch|devDependencies] Update package lint-staged from 16.3.3 to 16.3.4
- f476406: deps: [minor|devDependencies] Update package lint-staged from 16.3.4 to 16.4.0
- 3f6c386: deps: [major|devDependencies] Update package lint-staged from 16.4.0 to 17.0.2
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.2 to 17.0.3
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.3 to 17.0.4
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.4 to 17.0.5
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.5 to 17.0.6
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.6 to 17.0.7
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.0.7 to 17.0.8
- 5bacfed: deps: [minor|devDependencies] Update package lint-staged from 17.0.8 to 17.1.0
- 4ba525a: deps: [patch|devDependencies] Update package lint-staged from 17.1.0 to 17.1.1
- 5bacfed: deps: [minor|devDependencies] Update package lint-staged from 17.1.1 to 17.2.0
- 5bacfed: deps: [minor|devDependencies] Update package lint-staged from 17.2.0 to 17.3.0
- 1d95aa7: deps: [patch|engines] Update package node from v24.11.0 to v24.11.1
- ae78c6e: deps: [minor|engines] Update package node from v24.11.1 to v24.12.0
- e61f4d5: deps: [minor|engines] Update package node from v24.12.0 to v24.13.0
- de083a8: deps: [patch|engines] Update package node from v24.13.0 to v24.13.1
- be4f0c3: deps: [minor|engines] Update package node from v24.13.1 to v24.14.0
- dcd2144: deps: [patch|engines] Update package node from v24.14.0 to v24.14.1
- a599db7: deps: [minor|engines] Update package node from v24.14.1 to v24.15.0
- 28eb492: deps: [minor|engines] Update package node from v24.15.0 to v24.16.0
- 36077a0: deps: [minor|engines] Update package node from v24.16.0 to v24.17.0
- 377359a: deps: [minor|engines] Update package node from v24.17.0 to v24.18.0
- a278ba6: deps: [patch|engines] Update package node from v24.18.0 to v24.18.1
- e08fc3e: deps: [minor|engines] Update package node from v24.18.1 to v24.19.0
- 1fbe186: deps: [minor|volta] Update package pnpm from 10.20.0 to 10.21.0
- fdfcb6d: deps: [minor|volta] Update package pnpm from 10.21.0 to 10.22.0
- 6de20b2: deps: [minor|volta] Update package pnpm from 10.22.0 to 10.23.0
- eca0bd7: deps: [minor|volta] Update package pnpm from 10.23.0 to 10.24.0
- ee6114f: deps: [minor|volta] Update package pnpm from 10.24.0 to 10.25.0
- d13e768: deps: [minor|volta] Update package pnpm from 10.25.0 to 10.26.0
- 093c743: deps: [patch|volta] Update package pnpm from 10.26.0 to 10.26.1
- 561695e: deps: [patch|volta] Update package pnpm from 10.26.1 to 10.26.2
- e5a4114: deps: [minor|volta] Update package pnpm from 10.26.2 to 10.27.0
- e48315e: deps: [minor|volta] Update package pnpm from 10.27.0 to 10.28.0
- a3f7a6c: deps: [patch|volta] Update package pnpm from 10.28.0 to 10.28.1
- 206d4d0: deps: [patch|volta] Update package pnpm from 10.28.1 to 10.28.2
- 6ab7288: deps: [minor|volta] Update package pnpm from 10.28.2 to 10.29.1
- a80c8e6: deps: [patch|volta] Update package pnpm from 10.29.1 to 10.29.2
- 7668967: deps: [patch|volta] Update package pnpm from 10.29.2 to 10.29.3
- b9ef25f: deps: [minor|volta] Update package pnpm from 10.29.3 to 10.30.0
- 4205c20: deps: [patch|volta] Update package pnpm from 10.30.0 to 10.30.1
- 7ed3aaf: deps: [patch|volta] Update package pnpm from 10.30.1 to 10.30.2
- 44fac13: deps: [patch|volta] Update package pnpm from 10.30.2 to 10.30.3
- 55c3730: deps: [minor|volta] Update package pnpm from 10.30.3 to 10.31.0
- 201f9fe: deps: [minor|volta] Update package pnpm from 10.31.0 to 10.32.0
- 3dcad33: deps: [patch|volta] Update package pnpm from 10.32.0 to 10.32.1
- bf9331e: deps: [minor|volta] Update package pnpm from 10.32.1 to 10.33.0
- 91bd5b1: deps: [patch|volta] Update package pnpm from 10.33.0 to 10.33.1
- ed8fcb5: deps: [patch|volta] Update package pnpm from 10.33.1 to 10.33.2
- b633986: deps: [patch|volta] Update package pnpm from 10.33.2 to 10.33.3
- ee0d653: deps: [patch|volta] Update package pnpm from 10.33.3 to 10.33.4
- 9cde8be: deps: [major|volta] Update package pnpm from 10.33.4 to 11.1.1
- dfa6171: deps: [minor|volta] Update package pnpm from 11.10.0 to 11.11.0
- 478dd56: deps: [minor|volta] Update package pnpm from 11.11.0 to 11.13.0
- f6b93bf: deps: [patch|volta] Update package pnpm from 11.13.0 to 11.13.1
- 75e396a: deps: [minor|volta] Update package pnpm from 11.13.1 to 11.14.0
- d769455: deps: [minor|volta] Update package pnpm from 11.14.0 to 11.15.0
- 8d86197: deps: [patch|volta] Update package pnpm from 11.15.0 to 11.15.1
- b11b956: deps: [minor|volta] Update package pnpm from 11.15.1 to 11.16.0
- b2ee3bc: deps: [minor|volta] Update package pnpm from 11.16.0 to 11.17.0
- 17753aa: deps: [minor|volta] Update package pnpm from 11.17.0 to 11.18.0
- 69a819c: deps: [minor|volta] Update package pnpm from 11.18.0 to 11.19.0
- c1ac2c5: deps: [minor|volta] Update package pnpm from 11.19.0 to 11.20.0
- 838cef2: deps: [patch|volta] Update package pnpm from 11.1.1 to 11.1.2
- 28eb492: deps: [minor|volta] Update package pnpm from 11.1.2 to 11.3.0
- 6334250: deps: [minor|volta] Update package pnpm from 11.20.0 to 11.21.0
- f3df67e: deps: [minor|volta] Update package pnpm from 11.3.0 to 11.4.0
- 2fc8c57: deps: [minor|volta] Update package pnpm from 11.4.0 to 11.5.0
- 543fc53: deps: [patch|volta] Update package pnpm from 11.5.0 to 11.5.1
- 5fddbf5: deps: [patch|volta] Update package pnpm from 11.5.1 to 11.5.2
- 17b4cae: deps: [patch|volta] Update package pnpm from 11.5.2 to 11.5.3
- 121ae95: deps: [minor|volta] Update package pnpm from 11.5.3 to 11.6.0
- d4c56e5: deps: [minor|volta] Update package pnpm from 11.6.0 to 11.7.0
- 70d4b65: deps: [minor|volta] Update package pnpm from 11.7.0 to 11.8.0
- 2f72b80: deps: [minor|volta] Update package pnpm from 11.8.0 to 11.9.0
- 4e38aca: deps: [minor|volta] Update package pnpm from 11.9.0 to 11.10.0
- 80814ac: deps: [major|action] Update package pnpm/action-setup from v4 to v5
- dfcad70: deps: [major|action] Update package pnpm/action-setup from v5 to v6.0.3
- 63809c2: deps: [minor|devDependencies] Update package prettier from 3.6.2 to 3.7.1
- 8cf0e97: deps: [patch|devDependencies] Update package prettier from 3.7.1 to 3.7.2
- dd4b929: deps: [patch|devDependencies] Update package prettier from 3.7.2 to 3.7.3
- ee3e11a: deps: [patch|devDependencies] Update package prettier from 3.7.3 to 3.7.4
- 7803ee9: deps: [minor|devDependencies] Update package prettier from 3.7.4 to 3.8.0
- f5755e4: deps: [patch|devDependencies] Update package prettier from 3.8.0 to 3.8.1
- 2e50009: deps: [patch|devDependencies] Update package prettier from 3.8.1 to 3.8.2
- 7e3d136: deps: [patch|devDependencies] Update package prettier from 3.8.2 to 3.8.3
- 2160e5b: deps: [patch|devDependencies] Update package prettier from 3.8.3 to 3.8.4
- 9aad865: deps: [patch|devDependencies] Update package prettier from 3.8.4 to 3.8.5
- f8965ca: deps: [minor|devDependencies] Update package prettier from 3.8.5 to 3.9.0
- 3dd17b0: deps: [patch|devDependencies] Update package prettier from 3.9.0 to 3.9.1
- 28fd74e: deps: [patch|devDependencies] Update package prettier from 3.9.1 to 3.9.3
- 23f78f6: deps: [patch|devDependencies] Update package prettier from 3.9.3 to 3.9.4
- 3a611f6: deps: [patch|devDependencies] Update package prettier from 3.9.4 to 3.9.5
- 6181103: deps: [patch|devDependencies] Update package prettier from 3.9.5 to 3.9.6
- 0ce2404: deps: [major|action] Update package renovatebot/github-action from v43.0.20 to v44.0.0
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.0.0 to v44.0.2
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.0.2 to v44.0.3
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.0.3 to v44.0.4
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.0.4 to v44.0.5
- f0b8f0e: deps: [minor|action] Update package renovatebot/github-action from v44.0.5 to v44.1.0
- f0b8f0e: deps: [minor|action] Update package renovatebot/github-action from v44.1.0 to v44.2.0
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.2.0 to v44.2.1
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.2.1 to v44.2.3
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.2.3 to v44.2.4
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.2.4 to v44.2.5
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v44.2.5 to v44.2.6
- 0ce2404: deps: [major|action] Update package renovatebot/github-action from v44.2.6 to v46.0.1
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.0.1 to v46.0.2
- f0b8f0e: deps: [minor|action] Update package renovatebot/github-action from v46.0.2 to v46.1.1
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.1 to v46.1.2
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.10 to v46.1.12
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.12 to v46.1.13
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.13 to v46.1.14
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.14 to v46.1.15
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.15 to v46.1.16
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.16 to v46.1.17
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.17 to v46.1.18
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.18 to v46.1.19
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.19 to v46.1.20
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.2 to v46.1.3
- f0b8f0e: deps: [minor|action] Update package renovatebot/github-action from v46.1.20 to v46.2.1
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.3 to v46.1.4
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.4 to v46.1.5
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.5 to v46.1.6
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.6 to v46.1.7
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.7 to v46.1.8
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.8 to v46.1.9
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.1.9 to v46.1.10
- c4d5db2: deps: [patch|action] Update package renovatebot/github-action from v46.2.1 to v46.2.2
- aefacfb: deps: [patch|devDependencies] Update package semver from 7.7.3 to 7.7.4
- df4478d: deps: [minor|devDependencies] Update package semver from 7.7.4 to 7.8.0
- 7ba9b4a: deps: [patch|devDependencies] Update package semver from 7.8.0 to 7.8.1
- b3a6fd5: deps: [patch|devDependencies] Update package semver from 7.8.1 to 7.8.2
- 2160e5b: deps: [patch|devDependencies] Update package semver from 7.8.2 to 7.8.3
- 5e9b18d: deps: [patch|devDependencies] Update package semver from 7.8.3 to 7.8.4
- bc6a73c: deps: [patch|devDependencies] Update package semver from 7.8.4 to 7.8.5
- 23f78f6: deps: [patch|devDependencies] Update package turbo from 2.10.0 to 2.10.1
- 363f978: deps: [patch|devDependencies] Update package turbo from 2.10.1 to 2.10.2
- 6e23959: deps: [patch|devDependencies] Update package turbo from 2.10.2 to 2.10.3
- 1a4239c: deps: [patch|devDependencies] Update package turbo from 2.10.3 to 2.10.4
- da91af0: deps: [patch|devDependencies] Update package turbo from 2.10.4 to 2.10.5
- 3ea8234: deps: [patch|devDependencies] Update package turbo from 2.10.5 to 2.10.6
- 3e61fac: deps: [patch|devDependencies] Update package turbo from 2.10.6 to 2.10.7
- e33e503: deps: [patch|devDependencies] Update package turbo from 2.10.7 to 2.10.8
- 7edcd45: deps: [patch|devDependencies] Update package turbo from 2.10.8 to 2.10.9
- c4d5db2: deps: [patch|devDependencies] Update package turbo from 2.6.0 to 2.6.1
- 18bea54: deps: [patch|devDependencies] Update package turbo from 2.6.1 to 2.6.2
- 1ed1354: deps: [patch|devDependencies] Update package turbo from 2.6.2 to 2.6.3
- 1c8dfbd: deps: [minor|devDependencies] Update package turbo from 2.6.3 to 2.7.0
- 3b7a3a9: deps: [patch|devDependencies] Update package turbo from 2.7.0 to 2.7.1
- 8678341: deps: [patch|devDependencies] Update package turbo from 2.7.1 to 2.7.2
- fe2f038: deps: [patch|devDependencies] Update package turbo from 2.7.2 to 2.7.3
- 7533f2a: deps: [patch|devDependencies] Update package turbo from 2.7.3 to 2.7.4
- 4211ecf: deps: [patch|devDependencies] Update package turbo from 2.7.4 to 2.7.5
- e0647e5: deps: [patch|devDependencies] Update package turbo from 2.7.5 to 2.7.6
- 66246c6: deps: [minor|devDependencies] Update package turbo from 2.7.6 to 2.8.0
- 47f1730: deps: [patch|devDependencies] Update package turbo from 2.8.0 to 2.8.1
- af9c294: deps: [patch|devDependencies] Update package turbo from 2.8.1 to 2.8.2
- 2f7ab3f: deps: [patch|devDependencies] Update package turbo from 2.8.10 to 2.8.11
- dabd42a: deps: [patch|devDependencies] Update package turbo from 2.8.11 to 2.8.12
- 4eba60a: deps: [patch|devDependencies] Update package turbo from 2.8.12 to 2.8.13
- e65fd25: deps: [patch|devDependencies] Update package turbo from 2.8.13 to 2.8.14
- e6d3064: deps: [patch|devDependencies] Update package turbo from 2.8.14 to 2.8.15
- fed887f: deps: [patch|devDependencies] Update package turbo from 2.8.15 to 2.8.16
- 9f8dc3e: deps: [patch|devDependencies] Update package turbo from 2.8.16 to 2.8.17
- 158802d: deps: [patch|devDependencies] Update package turbo from 2.8.17 to 2.8.18
- 068f00b: deps: [patch|devDependencies] Update package turbo from 2.8.18 to 2.8.19
- a537ec0: deps: [patch|devDependencies] Update package turbo from 2.8.19 to 2.8.20
- 36971bd: deps: [patch|devDependencies] Update package turbo from 2.8.2 to 2.8.3
- 720cc99: deps: [patch|devDependencies] Update package turbo from 2.8.20 to 2.8.21
- 7437513: deps: [minor|devDependencies] Update package turbo from 2.8.21 to 2.9.1
- 69f5c30: deps: [patch|devDependencies] Update package turbo from 2.8.3 to 2.8.4
- 869113e: deps: [patch|devDependencies] Update package turbo from 2.8.4 to 2.8.5
- 1595811: deps: [patch|devDependencies] Update package turbo from 2.8.5 to 2.8.6
- 2aa8e85: deps: [patch|devDependencies] Update package turbo from 2.8.6 to 2.8.7
- 92ae11a: deps: [patch|devDependencies] Update package turbo from 2.8.7 to 2.8.8
- 5050f88: deps: [patch|devDependencies] Update package turbo from 2.8.8 to 2.8.9
- c52d333: deps: [patch|devDependencies] Update package turbo from 2.8.9 to 2.8.10
- c56ad4d: deps: [patch|devDependencies] Update package turbo from 2.9.1 to 2.9.3
- 7a2bff4: deps: [patch|devDependencies] Update package turbo from 2.9.10 to 2.9.11
- b74d974: deps: [patch|devDependencies] Update package turbo from 2.9.11 to 2.9.12
- 617128d: deps: [patch|devDependencies] Update package turbo from 2.9.12 to 2.9.14
- f80694a: deps: [patch|devDependencies] Update package turbo from 2.9.14 to 2.9.15
- 48e926b: deps: [patch|devDependencies] Update package turbo from 2.9.15 to 2.9.16
- 2160e5b: deps: [patch|devDependencies] Update package turbo from 2.9.16 to 2.9.17
- 553e4f7: deps: [patch|devDependencies] Update package turbo from 2.9.17 to 2.9.18
- df90e9a: deps: [minor|devDependencies] Update package turbo from 2.9.18 to 2.10.0
- 000202c: deps: [patch|devDependencies] Update package turbo from 2.9.3 to 2.9.4
- 3d5e515: deps: [patch|devDependencies] Update package turbo from 2.9.4 to 2.9.5
- b87cde3: deps: [patch|devDependencies] Update package turbo from 2.9.5 to 2.9.6
- f96fbaf: deps: [patch|devDependencies] Update package turbo from 2.9.6 to 2.9.7
- 03e3ec7: deps: [patch|devDependencies] Update package turbo from 2.9.7 to 2.9.8
- f559a4e: deps: [patch|devDependencies] Update package turbo from 2.9.8 to 2.9.9
- 6d47706: deps: [patch|devDependencies] Update package turbo from 2.9.9 to 2.9.10
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile
- 74a6e26: deps: Updated lockfile


</details>

## 0.3.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e9b7d1b: deps: [minor|devDependencies] Update package @turbo/gen from 2.5.8 to 2.6.0
- e0816be: deps: [patch|devDependencies] Update package @types/node from 24.7.0 to 24.7.1
- ea37720: deps: [patch|devDependencies] Update package @types/node from 24.7.1 to 24.7.2
- e7cd4b1: deps: [minor|devDependencies] Update package @types/node from 24.7.2 to 24.8.0
- 9207748: deps: [patch|devDependencies] Update package @types/node from 24.8.0 to 24.8.1
- 184d2ee: deps: [minor|devDependencies] Update package @types/node from 24.8.1 to 24.9.0
- 54c65ef: deps: [patch|devDependencies] Update package @types/node from 24.9.0 to 24.9.1
- fc2acac: deps: [patch|devDependencies] Update package @types/node from 24.9.1 to 24.9.2
- 736e98f: deps: [minor|devDependencies] Update package @types/node from 24.9.2 to 24.10.0
- bda301d: deps: [major|action] Update package actions/setup-node from v5 to v6
- 3f97677: deps: [minor|devDependencies] Update package eslint from 9.37.0 to 9.38.0
- 54e17ee: deps: [minor|devDependencies] Update package eslint from 9.38.0 to 9.39.1
- fcc125b: deps: [patch|devDependencies] Update package lint-staged from 16.2.3 to 16.2.4
- a9d43b6: deps: [patch|devDependencies] Update package lint-staged from 16.2.4 to 16.2.5
- 957752f: deps: [patch|devDependencies] Update package lint-staged from 16.2.5 to 16.2.6
- fc2acac: deps: [minor|engines] Update package node from v24.10.0 to v24.11.0
- 9c01d10: deps: [patch|volta] Update package pnpm from 10.18.1 to 10.18.2
- 4791058: deps: [patch|volta] Update package pnpm from 10.18.2 to 10.18.3
- 35e75ff: deps: [minor|volta] Update package pnpm from 10.18.3 to 10.19.0
- fc2acac: deps: [minor|volta] Update package pnpm from 10.19.0 to 10.20.0
- 95ae206: deps: [patch|action] Update package renovatebot/github-action from v43.0.15 to v43.0.16
- baef070: deps: [patch|action] Update package renovatebot/github-action from v43.0.16 to v43.0.17
- a9d43b6: deps: [patch|action] Update package renovatebot/github-action from v43.0.17 to v43.0.18
- 1932b8b: deps: [patch|action] Update package renovatebot/github-action from v43.0.18 to v43.0.19
- 0e7ff49: deps: [patch|action] Update package renovatebot/github-action from v43.0.19 to v43.0.20
- 9438395: deps: [minor|devDependencies] Update package turbo from 2.5.8 to 2.6.0
- 1fe446c: deps: Updated lockfile
- 1fe446c: deps: Updated lockfile
- 1fe446c: deps: Updated lockfile
- 85f3cc4: deps: Updated lockfile
- 85f3cc4: deps: Updated lockfile
- 85f3cc4: deps: Updated lockfile


</details>

## 0.3.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cc32e17: deps: [minor|devDependencies] Update package @types/node from 24.5.2 to 24.6.0
- 6f8e50d: deps: [patch|devDependencies] Update package @types/node from 24.6.0 to 24.6.1
- e63493a: deps: [patch|devDependencies] Update package @types/node from 24.6.1 to 24.6.2
- a756f63: deps: [minor|devDependencies] Update package @types/node from 24.6.2 to 24.7.0
- fa6ecaf: deps: [minor|devDependencies] Update package eslint from 9.36.0 to 9.37.0
- 7d56894: deps: [patch|devDependencies] Update package lint-staged from 16.2.0 to 16.2.1
- c0c397d: deps: [patch|devDependencies] Update package lint-staged from 16.2.1 to 16.2.2
- d954de2: deps: [patch|devDependencies] Update package lint-staged from 16.2.2 to 16.2.3
- 4f78cac: deps: [minor|engines] Update package node from v24.8.0 to v24.9.0
- 5d5b408: deps: [minor|engines] Update package node from v24.9.0 to v24.10.0
- 4f413f0: deps: [minor|volta] Update package pnpm from 10.17.1 to 10.18.0
- a756f63: deps: [patch|volta] Update package pnpm from 10.18.0 to 10.18.1
- fa7b39a: deps: [patch|action] Update package renovatebot/github-action from v43.0.13 to v43.0.14
- f48065e: deps: [patch|action] Update package renovatebot/github-action from v43.0.14 to v43.0.15
- 9e5bc19: deps: [patch|devDependencies] Update package semver from 7.7.2 to 7.7.3
- 5cae16a: deps: Updated lockfile
- 5cae16a: deps: Updated lockfile
- 5cae16a: deps: Updated lockfile
- 61e4a18: deps: Updated lockfile
- 61e4a18: deps: Updated lockfile
- 61e4a18: deps: Updated lockfile


</details>

## 0.3.3

### Patch Changes

- 8f03d77: Run typecheck command and not lint command in typecheck pipeline stage

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 5e89109: deps: [patch|devDependencies] Update package @changesets/cli from 2.29.5 to 2.29.6
- fdf9442: deps: [patch|devDependencies] Update package @changesets/cli from 2.29.6 to 2.29.7
- ff7d600: deps: [patch|devDependencies] Update package @turbo/gen from 2.5.5 to 2.5.6
- 4b52681: deps: [patch|devDependencies] Update package @turbo/gen from 2.5.6 to 2.5.7
- 7f91119: deps: [patch|devDependencies] Update package @turbo/gen from 2.5.7 to 2.5.8
- 07f989a: deps: [minor|devDependencies] Update package @types/node from 24.2.1 to 24.3.0
- d9f1876: deps: [patch|devDependencies] Update package @types/node from 24.3.0 to 24.3.1
- 908e130: deps: [patch|devDependencies] Update package @types/node from 24.3.1 to 24.3.2
- eac00a2: deps: [patch|devDependencies] Update package @types/node from 24.3.2 to 24.3.3
- 985254d: deps: [minor|devDependencies] Update package @types/node from 24.3.3 to 24.4.0
- 2f9cefa: deps: [minor|devDependencies] Update package @types/node from 24.4.0 to 24.5.0
- 29353de: deps: [patch|devDependencies] Update package @types/node from 24.5.0 to 24.5.1
- 6c1e1d4: deps: [patch|devDependencies] Update package @types/node from 24.5.1 to 24.5.2
- d38a362: deps: [major|action] Update package actions/checkout from v4 to v5
- a8af9ef: deps: [major|action] Update package actions/setup-node from v4 to v5
- e0de2a4: deps: [minor|devDependencies] Update package eslint from 9.33.0 to 9.34.0
- 52ab2a1: deps: [minor|devDependencies] Update package eslint from 9.34.0 to 9.35.0
- 9628bf9: deps: [minor|devDependencies] Update package eslint from 9.35.0 to 9.36.0
- 02a8a8f: deps: [patch|devDependencies] Update package lint-staged from 16.1.5 to 16.1.6
- 00d5885: deps: [minor|devDependencies] Update package lint-staged from 16.1.6 to 16.2.0
- 635589f: deps: [minor|engines] Update package node from v24.5.0 to v24.6.0
- 57f38d9: deps: [minor|engines] Update package node from v24.6.0 to v24.7.0
- 5b0835f: deps: [minor|engines] Update package node from v24.7.0 to v24.8.0
- b7b8774: deps: [minor|volta] Update package pnpm from 10.14.0 to 10.15.0
- ee2a684: deps: [patch|volta] Update package pnpm from 10.15.0 to 10.15.1
- 908e130: deps: [minor|volta] Update package pnpm from 10.15.1 to 10.16.0
- 77f1237: deps: [patch|volta] Update package pnpm from 10.16.0 to 10.16.1
- 1490f7b: deps: [minor|volta] Update package pnpm from 10.16.1 to 10.17.0
- 60f1846: deps: [patch|volta] Update package pnpm from 10.17.0 to 10.17.1
- d68ef20: deps: [patch|action] Update package renovatebot/github-action from v43.0.10 to v43.0.11
- a969525: deps: [patch|action] Update package renovatebot/github-action from v43.0.11 to v43.0.12
- bb8aa7f: deps: [patch|action] Update package renovatebot/github-action from v43.0.12 to v43.0.13
- 5114890: deps: [patch|action] Update package renovatebot/github-action from v43.0.6 to v43.0.7
- e5515a9: deps: [patch|action] Update package renovatebot/github-action from v43.0.7 to v43.0.8
- af7996f: deps: [patch|action] Update package renovatebot/github-action from v43.0.8 to v43.0.9
- 02a8a8f: deps: [patch|action] Update package renovatebot/github-action from v43.0.9 to v43.0.10
- ff7d600: deps: [patch|devDependencies] Update package turbo from 2.5.5 to 2.5.6
- 4b52681: deps: [patch|devDependencies] Update package turbo from 2.5.6 to 2.5.7
- 7f91119: deps: [patch|devDependencies] Update package turbo from 2.5.7 to 2.5.8
- 12a821f: deps: Updated lockfile
- 12a821f: deps: Updated lockfile
- 12a821f: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- f56fffb: deps: Updated lockfile
- f56fffb: deps: Updated lockfile
- f56fffb: deps: Updated lockfile


</details>

## 0.3.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b4d9ff3: deps: [minor|devDependencies] Update package @types/node from 24.1.0 to 24.2.0
- 341851a: deps: [patch|devDependencies] Update package @types/node from 24.2.0 to 24.2.1
- 6c86063: deps: [minor|devDependencies] Update package eslint from 9.32.0 to 9.33.0
- a805584: deps: [patch|devDependencies] Update package lint-staged from 16.1.2 to 16.1.4
- 8c64366: deps: [patch|devDependencies] Update package lint-staged from 16.1.4 to 16.1.5
- 8c64366: deps: [patch|action] Update package renovatebot/github-action from v43.0.5 to v43.0.6
- 36adbe0: deps: Updated lockfile
- 36adbe0: deps: Updated lockfile
- 36adbe0: deps: Updated lockfile
- 5150293: deps: Updated lockfile
- 5150293: deps: Updated lockfile
- 5150293: deps: Updated lockfile


</details>

## 0.3.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e095ed0: deps: [minor|devDependencies] Update package @types/node from 24.0.15 to 24.1.0
- 85e47ef: deps: [minor|devDependencies] Update package eslint from 9.31.0 to 9.32.0
- 6e75afc: deps: [minor|engines] Update package node from v24.4.1 to v24.5.0
- c281908: deps: [minor|volta] Update package pnpm from 10.13.1 to 10.14.0
- 0f85495: deps: [patch|action] Update package renovatebot/github-action from v43.0.3 to v43.0.4
- a4dc62e: deps: [patch|action] Update package renovatebot/github-action from v43.0.4 to v43.0.5
- 93bd1ff: deps: Updated lockfile
- 93bd1ff: deps: Updated lockfile
- 93bd1ff: deps: Updated lockfile


</details>

## 0.3.0

### Minor Changes

- c2132f3: Add package `@desselbane/vitest-helpers`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 55464ee: deps: [patch|devDependencies] Update package @types/node from 24.0.14 to 24.0.15


</details>

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