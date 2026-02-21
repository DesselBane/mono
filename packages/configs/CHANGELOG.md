# @desselbane/configs

## 17.0.0

### Major Changes

- db54b62: Move to incremental and composite build by default.

  If you want to opt out of this change set

  ```json
  {
    "compilerOptions": {
      "incremental": false,
      "composite": false
    }
  }
  ```

- db54b62: Emitting declaration files by default and setting outDir.

  By default the following values are now set:

  ```json
  {
    "compilerOptions": {
      "noEmit": false,
      "emitDeclarationOnly": true,
      "outDir": "${configDir}/node_modules/.build",
      "declarationDir": "${configDir}/node_modules/.build/declarations"
    }
  }
  ```

  This is due to the `composite` and `incremental` build being activated by default.

### Minor Changes

- db54b62: Update templates to reflect new typecheck scripts

### Patch Changes

- db54b62: Adapt to new incremental and composite build strategy.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 9330a5d: deps: [minor-breaking|peerDependencies] Require package `tsdown ^0.16.0`
- 17e27bd: deps: [minor|peerDependencies] Update peerDependency tsdown from ^0.19.0 to ^0.20.0
- 95683e9: deps: [minor|peerDependencies] Update tsdown peerDependency from ^0.16.0 to ^0.18.0
- 456e0bb: deps: [minor|peerDependencies] Update tsdown peerDependency from ^0.18.0 to ^0.19.0
- 6bc252e: deps: Updated lockfile
- 5ed328f: deps: [major|dependencies] Update package @eslint/compat from 1.4.1 to 2.0.0
- 6fc9499: deps: [patch|dependencies] Update package @eslint/compat from 2.0.0 to 2.0.1
- de6f6e8: deps: [patch|dependencies] Update package @eslint/compat from 2.0.1 to 2.0.2
- 3f2de43: deps: [patch|dependencies] Update package @eslint/js from 9.39.1 to 9.39.2
- 1b01a4a: deps: [patch|dependencies] Update package @eslint/js from 9.39.2 to 9.39.3
- 1d95aa7: deps: [patch|devDependencies] Update package @types/node from 24.10.0 to 24.10.1
- cd47b49: deps: [patch|devDependencies] Update package @types/node from 24.10.1 to 24.10.2
- 1ddd417: deps: [patch|devDependencies] Update package @types/node from 24.10.10 to 24.10.11
- 286d852: deps: [patch|devDependencies] Update package @types/node from 24.10.11 to 24.10.12
- de083a8: deps: [patch|devDependencies] Update package @types/node from 24.10.12 to 24.10.13
- ae78c6e: deps: [patch|devDependencies] Update package @types/node from 24.10.2 to 24.10.3
- 47cc9cb: deps: [patch|devDependencies] Update package @types/node from 24.10.3 to 24.10.4
- e48315e: deps: [patch|devDependencies] Update package @types/node from 24.10.4 to 24.10.6
- dd408a6: deps: [patch|devDependencies] Update package @types/node from 24.10.6 to 24.10.7
- e61f4d5: deps: [patch|devDependencies] Update package @types/node from 24.10.7 to 24.10.8
- 816cde5: deps: [patch|devDependencies] Update package @types/node from 24.10.8 to 24.10.9
- 7c11e5a: deps: [patch|devDependencies] Update package @types/node from 24.10.9 to 24.10.10
- eba27af: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.4.1 to 1.4.2
- 96b5a16: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.4.2 to 1.4.3
- 5914d38: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.4.3 to 1.4.4
- 951a7d2: deps: [minor|dependencies] Update package @vitest/eslint-plugin from 1.4.4 to 1.5.0
- cbd9513: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.5.0 to 1.5.1
- b83dd2d: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.5.1 to 1.5.2
- e8c62b6: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.5.2 to 1.5.4
- 007187c: deps: [minor|dependencies] Update package @vitest/eslint-plugin from 1.5.4 to 1.6.1
- cbad795: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.1 to 1.6.3
- 7289d13: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.3 to 1.6.4
- 9a10958: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.4 to 1.6.5
- 031a257: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.5 to 1.6.6
- 1376188: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.6 to 1.6.7
- 3bd945f: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.6.7 to 1.6.9
- 09c362b: deps: [minor|dependencies] Update package @vue/eslint-config-typescript from 14.6.0 to 14.7.0
- 3f2de43: deps: [patch|dependencies] Update package eslint from 9.39.1 to 9.39.2
- 1b01a4a: deps: [patch|dependencies] Update package eslint from 9.39.2 to 9.39.3
- ed918ae: deps: [minor|dependencies] Update package eslint-plugin-playwright from 2.3.0 to 2.4.0
- 6fc9499: deps: [patch|dependencies] Update package eslint-plugin-playwright from 2.4.0 to 2.4.1
- 5d63222: deps: [minor|dependencies] Update package eslint-plugin-playwright from 2.4.1 to 2.5.0
- 7a018af: deps: [patch|dependencies] Update package eslint-plugin-playwright from 2.5.0 to 2.5.1
- d0e0b26: deps: [minor|dependencies] Update package eslint-plugin-playwright from 2.5.1 to 2.6.0
- e4346cd: deps: [minor|dependencies] Update package eslint-plugin-playwright from 2.6.0 to 2.7.0
- 134ef72: deps: [patch|dependencies] Update package eslint-plugin-prettier from 5.5.4 to 5.5.5
- 5984485: deps: [minor|dependencies] Update package eslint-plugin-unused-imports from 4.3.0 to 4.4.1
- 13f7db1: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.5.1 to 10.6.0
- 6663137: deps: [patch|dependencies] Update package eslint-plugin-vue from 10.6.0 to 10.6.1
- 8890504: deps: [patch|dependencies] Update package eslint-plugin-vue from 10.6.1 to 10.6.2
- 7909a23: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.6.2 to 10.7.0
- f416603: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.7.0 to 10.8.0
- 63809c2: deps: [minor|dependencies] Update package prettier from 3.6.2 to 3.7.1
- 8cf0e97: deps: [patch|dependencies] Update package prettier from 3.7.1 to 3.7.2
- dd4b929: deps: [patch|dependencies] Update package prettier from 3.7.2 to 3.7.3
- ee3e11a: deps: [patch|dependencies] Update package prettier from 3.7.3 to 3.7.4
- 7803ee9: deps: [minor|dependencies] Update package prettier from 3.7.4 to 3.8.0
- f5755e4: deps: [patch|dependencies] Update package prettier from 3.8.0 to 3.8.1
- 5320df8: deps: [minor|devDependencies] Update package tsdown from 0.15.12 to 0.16.1
- c4d5db2: deps: [patch|devDependencies] Update package tsdown from 0.16.1 to 0.16.3
- ae8ec42: deps: [patch|devDependencies] Update package tsdown from 0.16.3 to 0.16.4
- c628ed6: deps: [patch|devDependencies] Update package tsdown from 0.16.4 to 0.16.5
- 3f64853: deps: [patch|devDependencies] Update package tsdown from 0.16.5 to 0.16.6
- a49610a: deps: [patch|devDependencies] Update package tsdown from 0.16.6 to 0.16.7
- 990247a: deps: [patch|devDependencies] Update package tsdown from 0.16.7 to 0.16.8
- 81d1b02: deps: [minor|devDependencies] Update package tsdown from 0.16.8 to 0.17.0
- dac8204: deps: [patch|devDependencies] Update package tsdown from 0.17.0 to 0.17.1
- d7b201d: deps: [patch|devDependencies] Update package tsdown from 0.17.1 to 0.17.2
- b269ce5: deps: [patch|devDependencies] Update package tsdown from 0.17.2 to 0.17.3
- da85682: deps: [patch|devDependencies] Update package tsdown from 0.17.3 to 0.17.4
- ddd3786: deps: [minor|devDependencies] Update package tsdown from 0.17.4 to 0.18.0
- 562b6f3: deps: [patch|devDependencies] Update package tsdown from 0.18.0 to 0.18.1
- b654f02: deps: [patch|devDependencies] Update package tsdown from 0.18.1 to 0.18.2
- 43ed4e0: deps: [patch|devDependencies] Update package tsdown from 0.18.2 to 0.18.3
- fe2f038: deps: [patch|devDependencies] Update package tsdown from 0.18.3 to 0.18.4
- 4c03f9a: deps: [minor|devDependencies] Update package tsdown from 0.18.4 to ^0.19.0
- a9d299f: deps: [minor|devDependencies] Update package tsdown from 0.19.0 to 0.20.1
- c451251: deps: [patch|devDependencies] Update package tsdown from 0.20.1 to 0.20.2
- 11b75ea: deps: [patch|devDependencies] Update package tsdown from 0.20.2 to 0.20.3
- 14b239c: deps: [patch|dependencies] Update package typescript-eslint from 8.46.3 to 8.46.4
- 8d010ce: deps: [minor|dependencies] Update package typescript-eslint from 8.46.4 to 8.47.0
- 951a7d2: deps: [minor|dependencies] Update package typescript-eslint from 8.47.0 to 8.48.0
- 03c2f18: deps: [patch|dependencies] Update package typescript-eslint from 8.48.0 to 8.48.1
- a2a3f49: deps: [minor|dependencies] Update package typescript-eslint from 8.48.1 to 8.49.0
- cc4813c: deps: [minor|dependencies] Update package typescript-eslint from 8.49.0 to 8.50.0
- a81d184: deps: [patch|dependencies] Update package typescript-eslint from 8.50.0 to 8.50.1
- e7e77bb: deps: [minor|dependencies] Update package typescript-eslint from 8.50.1 to 8.51.0
- c9a693c: deps: [minor|dependencies] Update package typescript-eslint from 8.51.0 to 8.52.0
- a77d1ba: deps: [minor|dependencies] Update package typescript-eslint from 8.52.0 to 8.53.0
- fdd4a01: deps: [patch|dependencies] Update package typescript-eslint from 8.53.0 to 8.53.1
- bb2d94d: deps: [minor|dependencies] Update package typescript-eslint from 8.53.1 to 8.54.0
- 1376188: deps: [minor|dependencies] Update package typescript-eslint from 8.54.0 to 8.55.0
- f5ac4c4: deps: [minor|dependencies] Update package typescript-eslint from 8.55.0 to 8.56.0
- 304f59f: deps: [patch|devDependencies] Update package vite from 7.2.2 to 7.2.4
- 239345f: deps: [patch|devDependencies] Update package vite from 7.2.4 to 7.2.6
- 058b27a: deps: [patch|devDependencies] Update package vite from 7.2.6 to 7.2.7
- 3f793ed: deps: [minor|devDependencies] Update package vite from 7.2.7 to 7.3.0
- 035694c: deps: [patch|devDependencies] Update package vite from 7.3.0 to 7.3.1
- 304f59f: deps: [patch|devDependencies] Update package vitest from 4.0.10 to 4.0.12
- 5b9394e: deps: [patch|devDependencies] Update package vitest from 4.0.12 to 4.0.13
- b0b3d55: deps: [patch|devDependencies] Update package vitest from 4.0.13 to 4.0.14
- 41a8a2f: deps: [patch|devDependencies] Update package vitest from 4.0.14 to 4.0.15
- 035694c: deps: [patch|devDependencies] Update package vitest from 4.0.15 to 4.0.17
- 21e79ea: deps: [patch|devDependencies] Update package vitest from 4.0.17 to 4.0.18
- 0959a2b: deps: [patch|devDependencies] Update package vitest from 4.0.7 to 4.0.8
- bc0ea2a: deps: [patch|devDependencies] Update package vitest from 4.0.8 to 4.0.9
- ecff42a: deps: [patch|devDependencies] Update package vitest from 4.0.9 to 4.0.10
- 2c319b5: deps: [minor|dependencies] Update package vue-eslint-parser from 10.2.0 to 10.3.0
- f416603: deps: [minor|dependencies] Update package vue-eslint-parser from 10.3.0 to 10.4.0
- e9f86de: deps: [patch|dependencies] Update package vue3-snapshot-serializer from 2.13.0 to 2.13.1
- ec65c6a: deps: [patch|dependencies] Update package zod from 4.1.12 to 4.1.13
- 90ccdc5: deps: [minor|dependencies] Update package zod from 4.1.13 to 4.2.0
- 35d08d2: deps: [patch|dependencies] Update package zod from 4.2.0 to 4.2.1
- f0b1da8: deps: [minor|dependencies] Update package zod from 4.2.1 to 4.3.2
- fe2f038: deps: [patch|dependencies] Update package zod from 4.3.2 to 4.3.5
- a757be4: deps: [patch|dependencies] Update package zod from 4.3.5 to 4.3.6
- 74a6e26: deps: Updated lockfile
- e96fef2: deps: Updated lockfile
- 5d442aa: deps: Updated lockfile
- ffdd050: deps: Updated lockfile
- 1f64b27: deps: Updated lockfile
- 7c85b44: deps: Updated lockfile
- 8fb689f: deps: Updated lockfile
- d4b5b5e: deps: Updated lockfile
- 94dc8a9: deps: Updated lockfile
- 33ef9d6: deps: Updated lockfile


</details>

## 16.0.1

### Patch Changes

- e783c7e: Fix vitest tsconfig to include node types.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 54e17ee: deps: [patch|dependencies] Update package @eslint/compat from 1.4.0 to 1.4.1
- 3f97677: deps: [minor|dependencies] Update package @eslint/js from 9.37.0 to 9.38.0
- 54e17ee: deps: [minor|dependencies] Update package @eslint/js from 9.38.0 to 9.39.1
- e0816be: deps: [patch|devDependencies] Update package @types/node from 24.7.0 to 24.7.1
- ea37720: deps: [patch|devDependencies] Update package @types/node from 24.7.1 to 24.7.2
- e7cd4b1: deps: [minor|devDependencies] Update package @types/node from 24.7.2 to 24.8.0
- 9207748: deps: [patch|devDependencies] Update package @types/node from 24.8.0 to 24.8.1
- 184d2ee: deps: [minor|devDependencies] Update package @types/node from 24.8.1 to 24.9.0
- 54c65ef: deps: [patch|devDependencies] Update package @types/node from 24.9.0 to 24.9.1
- fc2acac: deps: [patch|devDependencies] Update package @types/node from 24.9.1 to 24.9.2
- 736e98f: deps: [minor|devDependencies] Update package @types/node from 24.9.2 to 24.10.0
- a8e7630: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.16 to 1.3.17
- 64aaa51: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.17 to 1.3.18
- b7b8807: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.18 to 1.3.20
- 3f97677: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.20 to 1.3.23
- 62b2f23: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.23 to 1.3.24
- d22e302: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.24 to 1.3.25
- ea06ef1: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.25 to 1.3.26
- 54e17ee: deps: [minor|dependencies] Update package @vitest/eslint-plugin from 1.3.26 to 1.4.0
- 4123c7d: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.4.0 to 1.4.1
- 3f97677: deps: [minor|dependencies] Update package eslint from 9.37.0 to 9.38.0
- 54e17ee: deps: [minor|dependencies] Update package eslint from 9.38.0 to 9.39.1
- 54e17ee: deps: [minor|dependencies] Update package eslint-plugin-playwright from 2.2.2 to 2.3.0
- 424bc03: deps: [major|dependencies] Update package eslint-plugin-unicorn from 61.0.2 to 62.0.0
- b7e6c37: deps: [minor|dependencies] Update package eslint-plugin-unused-imports from 4.2.0 to 4.3.0
- 257053a: deps: [patch|dependencies] Update package eslint-plugin-vue from 10.5.0 to 10.5.1
- 290a444: deps: [major|dependencies] Update package jest-extended from 6.0.0 to 7.0.0
- 1932b8b: deps: [patch|devDependencies] Update package tsdown from 0.15.10 to 0.15.12
- baef070: deps: [patch|devDependencies] Update package tsdown from 0.15.6 to 0.15.7
- ff874e0: deps: [patch|devDependencies] Update package tsdown from 0.15.7 to 0.15.8
- a9d43b6: deps: [patch|devDependencies] Update package tsdown from 0.15.8 to 0.15.9
- 9eef257: deps: [patch|devDependencies] Update package tsdown from 0.15.9 to 0.15.10
- 64aaa51: deps: [patch|dependencies] Update package typescript-eslint from 8.46.0 to 8.46.1
- e8ce638: deps: [patch|dependencies] Update package typescript-eslint from 8.46.1 to 8.46.2
- 54e17ee: deps: [patch|dependencies] Update package typescript-eslint from 8.46.2 to 8.46.3
- 1dd0c88: deps: [patch|devDependencies] Update package vite from 7.1.10 to 7.1.11
- be49f6a: deps: [patch|devDependencies] Update package vite from 7.1.11 to 7.1.12
- 9e7794a: deps: [minor|devDependencies] Update package vite from 7.1.12 to 7.2.0
- 538f385: deps: [patch|devDependencies] Update package vite from 7.1.9 to 7.1.10
- 1fa24a3: deps: [patch|devDependencies] Update package vite from 7.2.0 to 7.2.1
- 5b5e902: deps: [patch|devDependencies] Update package vite from 7.2.1 to 7.2.2
- 60de6d2: deps: [major|devDependencies] Update package vitest from 3.2.4 to 4.0.1
- a480137: deps: [patch|devDependencies] Update package vitest from 4.0.1 to 4.0.2
- f36f9f0: deps: [patch|devDependencies] Update package vitest from 4.0.2 to 4.0.3
- e8d1889: deps: [patch|devDependencies] Update package vitest from 4.0.3 to 4.0.4
- 35812a1: deps: [patch|devDependencies] Update package vitest from 4.0.4 to 4.0.5
- e9fa84c: deps: [patch|devDependencies] Update package vitest from 4.0.5 to 4.0.6
- cd8d406: deps: [patch|devDependencies] Update package vitest from 4.0.6 to 4.0.7
- 1fe446c: deps: Updated lockfile
- 85f3cc4: deps: Updated lockfile


</details>

## 16.0.0

### Major Changes

- e509906: Eslint turn off rules: `import-x/named`, `import-x/namespace`, `import-x/default`, `import-x/no-named-as-default-member`, `import-x/no-unresolved` as they are covered by typescript. Check your ts config an re-enable them if they are not covered by your config.

### Minor Changes

- 1cddff1: Eslint use vitest.recommended instead of all config preset
- 3be793d: Eslint add vscode default config to README

### Dependency Changes

<details>
<summary> Click to expand </summary>

- fa6ecaf: deps: [minor|dependencies] Update package @eslint/js from 9.36.0 to 9.37.0
- cc32e17: deps: [minor|devDependencies] Update package @types/node from 24.5.2 to 24.6.0
- 6f8e50d: deps: [patch|devDependencies] Update package @types/node from 24.6.0 to 24.6.1
- e63493a: deps: [patch|devDependencies] Update package @types/node from 24.6.1 to 24.6.2
- a756f63: deps: [minor|devDependencies] Update package @types/node from 24.6.2 to 24.7.0
- eb13703: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.12 to 1.3.13
- fa6ecaf: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.13 to 1.3.15
- 69c2dce: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.15 to 1.3.16
- fa6ecaf: deps: [minor|dependencies] Update package eslint from 9.36.0 to 9.37.0
- fa7b39a: deps: [patch|dependencies] Update package jiti from 2.6.0 to 2.6.1
- ca214cb: deps: [patch|devDependencies] Update package tsdown from 0.15.4 to 0.15.5
- fa7b39a: deps: [patch|devDependencies] Update package tsdown from 0.15.5 to 0.15.6
- fa7b39a: deps: [patch|devDependencies] Update package typescript from 5.9.2 to 5.9.3
- ca43bdf: deps: [minor|dependencies] Update package typescript-eslint from 8.44.1 to 8.45.0
- 04c4a72: deps: [minor|dependencies] Update package typescript-eslint from 8.45.0 to 8.46.0
- b5f2d6e: deps: [patch|devDependencies] Update package vite from 7.1.7 to 7.1.8
- feb1d3f: deps: [patch|devDependencies] Update package vite from 7.1.8 to 7.1.9
- f48065e: deps: [patch|dependencies] Update package zod from 4.1.11 to 4.1.12
- 5cae16a: deps: Updated lockfile
- 61e4a18: deps: Updated lockfile


</details>

## 15.0.1

### Patch Changes

- 981eb66: Fix non typechecked eslint config

## 15.0.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- d857ec0: deps: [major|peerDependencies] Update peerDependency vitest to ^3.0.5
- 8e291d2: deps: [major|peerDependencies] Update peerDependency vite to ^7.0.0
- 91638f3: deps: [major|peerDependencies] Update package peerDependency tsdown to ^0.15.0
- 9628bf9: deps: [minor|dependencies] Update package @eslint/compat from 1.3.2 to 1.4.0
- e6fca53: deps: [minor|dependencies] Update package @eslint/js from 9.33.0 to 9.34.0
- 52ab2a1: deps: [minor|dependencies] Update package @eslint/js from 9.34.0 to 9.35.0
- 9628bf9: deps: [minor|dependencies] Update package @eslint/js from 9.35.0 to 9.36.0
- 07f989a: deps: [minor|devDependencies] Update package @types/node from 24.2.1 to 24.3.0
- d9f1876: deps: [patch|devDependencies] Update package @types/node from 24.3.0 to 24.3.1
- 908e130: deps: [patch|devDependencies] Update package @types/node from 24.3.1 to 24.3.2
- eac00a2: deps: [patch|devDependencies] Update package @types/node from 24.3.2 to 24.3.3
- 985254d: deps: [minor|devDependencies] Update package @types/node from 24.3.3 to 24.4.0
- 2f9cefa: deps: [minor|devDependencies] Update package @types/node from 24.4.0 to 24.5.0
- 29353de: deps: [patch|devDependencies] Update package @types/node from 24.5.0 to 24.5.1
- 6c1e1d4: deps: [patch|devDependencies] Update package @types/node from 24.5.1 to 24.5.2
- 38b8d6a: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.4 to 1.3.5
- 18c891e: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.5 to 1.3.6
- d31c924: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.6 to 1.3.7
- 9ef1aef: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.7 to 1.3.8
- be5beab: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.8 to 1.3.9
- 9628bf9: deps: [patch|dependencies] Update package @vitest/eslint-plugin from 1.3.9 to 1.3.12
- e0de2a4: deps: [minor|dependencies] Update package eslint from 9.33.0 to 9.34.0
- 52ab2a1: deps: [minor|dependencies] Update package eslint from 9.34.0 to 9.35.0
- 9628bf9: deps: [minor|dependencies] Update package eslint from 9.35.0 to 9.36.0
- 753eae4: deps: [major|dependencies] Update package eslint-plugin-unicorn from 60.0.0 to 61.0.1
- 7966ec9: deps: [patch|dependencies] Update package eslint-plugin-unicorn from 61.0.1 to 61.0.2
- 391688b: deps: [minor|dependencies] Update package eslint-plugin-unused-imports from 4.1.4 to 4.2.0
- 9628bf9: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.4.0 to 10.5.0
- 2b8cc10: deps: [minor|dependencies] Update package jiti from 2.5.1 to 2.6.0
- 5114890: deps: [patch|devDependencies] Update package tsdown from 0.14.0 to 0.14.1
- af7996f: deps: [patch|devDependencies] Update package tsdown from 0.14.1 to 0.14.2
- 37e00ee: deps: [patch|devDependencies] Update package tsdown from 0.15.0 to 0.15.1
- 324e549: deps: [patch|devDependencies] Update package tsdown from 0.15.1 to 0.15.2
- a1eda12: deps: [patch|devDependencies] Update package tsdown from 0.15.2 to 0.15.3
- 9838346: deps: [patch|devDependencies] Update package tsdown from 0.15.3 to 0.15.4
- 993bcbc: deps: [patch|dependencies] Update package typescript-eslint from 8.39.0 to 8.39.1
- 54067c0: deps: [minor|dependencies] Update package typescript-eslint from 8.39.1 to 8.40.0
- cd551c1: deps: [minor|dependencies] Update package typescript-eslint from 8.40.0 to 8.41.0
- d31c924: deps: [minor|dependencies] Update package typescript-eslint from 8.41.0 to 8.42.0
- c1fba26: deps: [minor|dependencies] Update package typescript-eslint from 8.42.0 to 8.43.0
- 9628bf9: deps: [minor|dependencies] Update package typescript-eslint from 8.43.0 to 8.44.1
- 2f41ce2: deps: [patch|devDependencies] Update package vite from 7.1.1 to 7.1.2
- 923be61: deps: [patch|devDependencies] Update package vite from 7.1.2 to 7.1.3
- b622224: deps: [patch|devDependencies] Update package vite from 7.1.3 to 7.1.4
- d45688c: deps: [patch|devDependencies] Update package vite from 7.1.4 to 7.1.5
- 9836610: deps: [patch|devDependencies] Update package vite from 7.1.5 to 7.1.6
- 4c24405: deps: [patch|devDependencies] Update package vite from 7.1.6 to 7.1.7
- 2b06b1c: deps: [minor|dependencies] Update package vue3-snapshot-serializer from 2.12.0 to 2.13.0
- 7276b3d: deps: [minor|dependencies] Update package zod from 4.0.17 to 4.1.0
- 4d7b86f: deps: [patch|dependencies] Update package zod from 4.1.0 to 4.1.1
- af7996f: deps: [patch|dependencies] Update package zod from 4.1.1 to 4.1.5
- 89dd150: deps: [patch|dependencies] Update package zod from 4.1.5 to 4.1.6
- 46b3bb8: deps: [patch|dependencies] Update package zod from 4.1.6 to 4.1.7
- 5f9af1b: deps: [patch|dependencies] Update package zod from 4.1.7 to 4.1.8
- 6c4a8de: deps: [patch|dependencies] Update package zod from 4.1.8 to 4.1.9
- 9838346: deps: [patch|dependencies] Update package zod from 4.1.9 to 4.1.11
- 12a821f: deps: Updated lockfile
- 5d93987: deps: Updated lockfile
- 89130f2: deps: Updated lockfile
- fe65b13: deps: Updated lockfile
- f56fffb: deps: Updated lockfile


</details>

## 14.1.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ce10ec9: deps: [patch|dependencies] Update package @eslint/compat from 1.3.1 to 1.3.2
- 6c86063: deps: [minor|dependencies] Update package @eslint/js from 9.32.0 to 9.33.0
- b4d9ff3: deps: [minor|devDependencies] Update package @types/node from 24.1.0 to 24.2.0
- 341851a: deps: [patch|devDependencies] Update package @types/node from 24.2.0 to 24.2.1
- 6c86063: deps: [minor|dependencies] Update package eslint from 9.32.0 to 9.33.0
- 1b496ca: deps: [patch|dependencies] Update package eslint-plugin-prettier from 5.5.3 to 5.5.4
- f319fbc: deps: [patch|devDependencies] Update package tsdown from 0.13.1 to 0.13.2
- 9c686b3: deps: [patch|devDependencies] Update package tsdown from 0.13.2 to 0.13.3
- 8c64366: deps: [patch|devDependencies] Update package tsdown from 0.13.3 to 0.13.4
- 889bf3d: deps: [minor|devDependencies] Update package tsdown from 0.13.4 to 0.14.0
- ef1aa5b: deps: [minor|peerDependencies] Update package tsdown from 0.13.5 to 0.14.0
- 7110ffd: deps: [minor|dependencies] Update package typescript-eslint from 8.38.0 to 8.39.0
- 061af41: deps: [minor|devDependencies] Update package vite from 7.0.6 to 7.1.0
- fb6af4b: deps: [patch|devDependencies] Update package vite from 7.1.0 to 7.1.1
- d5c80c9: deps: [patch|dependencies] Update package zod from 4.0.14 to 4.0.15
- 719b83a: deps: [patch|dependencies] Update package zod from 4.0.15 to 4.0.16
- b0e6b84: deps: [patch|dependencies] Update package zod from 4.0.16 to 4.0.17
- 36adbe0: deps: Updated lockfile
- 5150293: deps: Updated lockfile


</details>

## 14.1.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 85e47ef: deps: [minor|dependencies] Update package @eslint/js from 9.31.0 to 9.32.0
- e095ed0: deps: [minor|devDependencies] Update package @types/node from 24.0.15 to 24.1.0
- 85e47ef: deps: [minor|dependencies] Update package eslint from 9.31.0 to 9.32.0
- 3c14309: deps: [patch|dependencies] Update package eslint-plugin-playwright from 2.2.0 to 2.2.1
- d36e45d: deps: [patch|dependencies] Update package eslint-plugin-playwright from 2.2.1 to 2.2.2
- 640f39b: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.3.0 to 10.4.0
- d8fe1d1: deps: [minor|dependencies] Update package jiti from 2.4.2 to 2.5.0
- 2e29a87: deps: [patch|dependencies] Update package jiti from 2.5.0 to 2.5.1
- be2659f: deps: [minor|devDependencies] Update package tsdown from 0.12.9 to 0.13.0
- df6f8ec: deps: [patch|devDependencies] Update package tsdown from 0.13.0 to 0.13.1
- 69bfb72: deps: [minor|devDependencies] Update package typescript from 5.8.3 to 5.9.2
- 96126e3: deps: [patch|devDependencies] Update package vite from 7.0.5 to 7.0.6
- a4dc62e: deps: [patch|dependencies] Update package zod from 4.0.10 to 4.0.11
- 552d09f: deps: [patch|dependencies] Update package zod from 4.0.11 to 4.0.13
- 46bfab5: deps: [patch|dependencies] Update package zod from 4.0.13 to 4.0.14
- 0f85495: deps: [patch|dependencies] Update package zod from 4.0.5 to 4.0.8
- 2e29a87: deps: [patch|dependencies] Update package zod from 4.0.8 to 4.0.9
- ef9cf5b: deps: [patch|dependencies] Update package zod from 4.0.9 to 4.0.10
- 93bd1ff: deps: Updated lockfile


</details>

## 14.1.0

### Minor Changes

- 393b3b6: Add `@desselbane/vitest-helpers` as default package for newly created packages.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 55464ee: deps: [patch|devDependencies] Update package @types/node from 24.0.14 to 24.0.15
- c370e46: deps: [patch|dependencies] Update package eslint-config-prettier from 10.1.5 to 10.1.8
- c370e46: deps: [patch|dependencies] Update package eslint-plugin-prettier from 5.5.1 to 5.5.3
- c3b9c3a: deps: [major|dependencies] Update package eslint-plugin-unicorn from 59.0.1 to 60.0.0
- 9679b5a: deps: [minor|peerDependencies] Update package tsdown from 0.12.9 to 0.13.0
- 53a7dfa: deps: [minor|dependencies] Update package typescript-eslint from 8.37.0 to 8.38.0


</details>

## 14.0.0

### Major Changes

- 319f393: Remove support for `tsup`. Use `tsdown` instead.

### Minor Changes

- 27d268f: Support and enable type tests by default. Any files using the `.spec-d.ts` extension will are classified as type tests.
- f35e74f: Eslint `reportUnusedInlineConfigs` as errors
- cb5c173: Enable `declarationMap` by default
- ed64e9d: Turn off `unicorn/prevent-abbreviations`
- 319f393: Migrate build system to `tsdown`. This enables `declarationMap`s.
- ae1f41f: Eslint `reportUnusedDisableDirectives` as `error`
- 36ed2fb: Add support for `tsdown`.

  This is a basic [`tsdown`](https://tsdown.dev/) config which by default targets esm and the `neutral` platform.

  Place a `tsdown.config.ts` file next to your `package.json` with the following content:

  ```typescript
  import { defineConfig } from 'tsdown'
  import { libConfig } from './src/tsdown.config.tpl.ts'

  export default defineConfig({
    ...libConfig,
  })
  ```

- 8542b98: Add `@vitest/eslint-plugin-vitest`
- e1f842a: tsdown config add `nodeConsoleAppConfig`
- 730280f: Disable `vitest/prefer-importing-vitest-globals` in favor of `vitest/no-importing-vitest-globals`
- 15c8cbd: Disable `vitest/require-top-level-describe`
- 954927f: Exclude `**/__mocks__/**` from vitest coverage

### Patch Changes

- c51c633: Turn off `vitest/no-standalone-expect` as it incorrecltly flags extended tests as not a test.
- a625004: Eslint fail on warnings

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 3924a9f: deps: [minor|dependencies] Update package @eslint/js from 9.30.1 to 9.31.0
- 4441786: deps: [patch|devDependencies] Update package @types/node from 24.0.10 to 24.0.11
- 4f0092b: deps: [patch|devDependencies] Update package @types/node from 24.0.11 to 24.0.12
- 6bfb1dc: deps: [patch|devDependencies] Update package @types/node from 24.0.12 to 24.0.13
- b64dde0: deps: [patch|devDependencies] Update package @types/node from 24.0.13 to 24.0.14
- 87d2fbe: deps: [minor|dependencies] Update package eslint from 9.30.1 to 9.31.0
- ac524f4: deps: [minor|dependencies] Update package typescript-eslint from 8.36.0 to 8.37.0
- 3bf46b1: deps: [patch|devDependencies] Update package vite from 7.0.3 to 7.0.4
- bafcc1a: deps: [patch|devDependencies] Update package vite from 7.0.4 to 7.0.5
- 920c7ea: deps: [major|dependencies] Update package zod from 3.25.76 to 4.0.5
- a9456ff: deps: Updated lockfile


</details>

## 13.0.0

### Major Changes

- ff4bffa: Update scope from private `@repo` to public `@desselbane`

### Minor Changes

- 7225567: Add `@desselbane` as npm scope
- 27860f0: Turn off `unicorn/no-keyword-prefix` eslint rule.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 12cc633: deps(patch): Update package eslint-import-resolver-typescript from 4.4.3 to 4.4.3
- 12cc633: deps(patch): Update package eslint-plugin-import-x from 4.15.1 to 4.15.1
- 12cc633: deps(minor): Update package eslint-plugin-vue from 10.2.0 to 10.2.0
- 12cc633: deps(patch): Update package @types/node from 22.15.30 to 22.15.30
- 12cc633: deps(patch): Update package typescript-eslint from 8.33.1 to 8.33.1
- 12cc633: deps(patch): Update package vitest from 3.2.0 to 3.2.2
- 12cc633: deps(minor): Update package vue3-snapshot-serializer from 2.11.0 to 2.11.0
- 12cc633: deps(patch): Update package zod from 3.25.43 to 3.25.56
- 12cc633: deps: Updated lockfile
- 75d0a3f: deps: [patch|dependencies] Update package zod from 3.25.75 to 3.25.76
- 133bf18: deps: [minor|dependencies] Update package @eslint/compat from 1.2.9 to 1.3.1
- 133bf18: deps: [minor|dependencies] Update package @eslint/js from 9.28.0 to 9.30.1
- fc0ecc1: deps: [minor|devDependencies] Update package @types/node from 22.15.32 to 22.16.0
- d53be68: deps: [major|devDependencies] Update package @types/node from 22.15.32 to 24.0.10
- 133bf18: deps: [minor|dependencies] Update package @vue/eslint-config-typescript from 14.5.0 to 14.6.0
- 133bf18: deps: [minor|dependencies] Update package eslint from 9.28.0 to 9.30.1
- 133bf18: deps: [patch|dependencies] Update package eslint-import-resolver-typescript from 4.4.3 to 4.4.4
- 133bf18: deps: [minor|dependencies] Update package eslint-plugin-import-x from 4.15.1 to 4.16.1
- 133bf18: deps: [minor|dependencies] Update package eslint-plugin-prettier from 5.4.1 to 5.5.1
- 133bf18: deps: [minor|dependencies] Update package eslint-plugin-vue from 10.2.0 to 10.3.0
- b90c8d6: deps: [major|dependencies] Update package jest-extended from 5.0.3 to 6.0.0
- 266c4de: deps: [minor|dependencies] Update package prettier from 3.5.3 to 3.6.2
- 133bf18: deps: [minor|dependencies] Update package typescript-eslint from 8.33.1 to 8.35.1
- f088b36: deps: [minor|dependencies] Update package typescript-eslint from 8.35.1 to 8.36.0
- cdcc135: deps: [major|devDependencies] Update package vite from 6.3.5 to 7.0.2
- 9b0d4cd: deps: [patch|devDependencies] Update package vite from 7.0.2 to 7.0.3
- 133bf18: deps: [minor|dependencies] Update package vue-eslint-parser from 10.1.3 to 10.2.0
- 81b22c8: deps: Updated lockfile


</details>

## 12.0.0

### Major Changes

- dd598fa: Add support for [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main) and include its `configs.all` config by default. This will most likely break the linting in your project. You should fix the linting errors but if that is not an option you can either deactivate single rules like so

  ```typescript
  // eslint.config.ts
  import path from 'node:path'
  import { createEslintConfig } from '@desselbane/configs/eslint'

  export default createEslintConfig({
    workspaceDir: path.join(import.meta.dirname, '..', '..', '..'),
    packageDir: import.meta.dirname,
    additionalConfigs: [
      {
        rules: {
          'unicorn/prefer-spread': 'off',
        },
      },
    ],
  })
  ```

  or deactivate all rules like this

  ```typescript
  // eslint.config.ts
  import path from 'node:path'
  import { createEslintConfig } from '@desselbane/configs/eslint'

  export default createEslintConfig({
    workspaceDir: path.join(import.meta.dirname, '..', '..', '..'),
    packageDir: import.meta.dirname,
    useUnicornPlugin: false,
  })
  ```

- c260702: Add the `vue3-snapshot-serializer` package and set it as the default snapshot serializer. This will most likely cause all of your snapshot tests to fail. You can safely update the snapshots or if you don't want to use the `vue3-snapshot-serializer` you can change your vitest config like so:

  ```typescript
  // Before
  export { default } from '@desselbane/configs/vitest'
  ```

  ```typescript
  // After
  import { createVitestConfig } from '@desselbane/configs/vitest'

  export default createVitestConfig({ useVue3SnapshotSerializer: false })
  ```

### Minor Changes

- 65fdb1f: Vitest setup: mock @vueuse/core `createSharedComposable` to be isolated for each test instance

### Patch Changes

- 8b575a9: Fix package url. This should display changelogs in renovate.
- 21758a1: Always set publishConfig
- 67cda95: Fix install dependency steps, include npmScope with packageName

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 4242703: deps(peer): Update peerDependency vite from `^5.4.17 || ^6.2.5` to `^5.4.19 || ^6.3.4` in response to [CVE-2025-46565](https://nvd.nist.gov/vuln/detail/CVE-2025-46565) / [GHSA-859w-5945-r5v3](https://github.com/advisories/GHSA-859w-5945-r5v3)
- 6e64f58: deps(patch): Update package eslint-config-prettier from 10.1.1 to 10.1.5
- df36dd6: deps(minor): Update package eslint-import-resolver-typescript from 4.3.1 to 4.4.2
- 085f1cc: deps(minor): Update package eslint-plugin-import-x from 4.10.0 to 4.15.0
- 07390fd: deps(minor): Update package eslint-plugin-prettier from 5.2.6 to 5.4.1
- 0336c5c: deps(minor): Update package eslint-plugin-vue from 10.0.0 to 10.1.0
- 8fb5b4d: deps(minor): Update package eslint from 9.23.0 to 9.28.0
- 23dee99: deps(patch): Update package eslint_compat from 1.2.8 to 1.2.9
- 8fb5b4d: deps(minor): Update package @eslint/js from 9.23.0 to 9.28.0
- 8d0f3e9: deps(patch): Update package jest-extended from 5.0.2 to 5.0.3
- 3d997d6: deps(minor): Update package tsup from 8.5.0 to 8.5.0
- df36dd6: deps(minor): Update package @types/node from 22.7.8 to 22.15.29
- fd2ee24: deps(minor): Update package typescript-eslint from 8.29.0 to 8.33.0
- 291257a: deps(patch): Update package typescript from 5.8.2 to 5.8.3
- 0336c5c: deps(minor): Update package vite from 6.2.5 to 6.3.4
- b922aea: deps(patch): Update package vite from 6.3.4 to 6.3.5
- 4757606: deps(patch): Update package vitest from 3.1.1 to 3.1.4
- 0b6fdcd: deps(patch): Update package vue-eslint-parser from 10.1.2 to 10.1.3
- df36dd6: deps(minor): Update package zod from 3.24.2 to 3.25.42
- 776bdc5: deps: Updated lockfile
- 512461e: deps: Updated lockfile
- 6b26c2e: deps: Updated lockfile
- ab59d2c: deps: Updated lockfile
- c2fe4e8: deps: Updated lockfile
- ea663cf: deps: Updated lockfile
- eddbb5d: deps: Updated lockfile
- 1b989b0: deps: Updated lockfile


</details>

## 12.0.0-next.8

### Major Changes

- dd598fa: Add support for [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn/tree/main) and include its `configs.all` config by default. This will most likely break the linting in your project. You should fix the linting errors but if that is not an option you can either deactivate single rules like so

  ```typescript
  // eslint.config.ts
  import path from 'node:path'
  import { createEslintConfig } from '@desselbane/configs/eslint'

  export default createEslintConfig({
    workspaceDir: path.join(import.meta.dirname, '..', '..', '..'),
    packageDir: import.meta.dirname,
    additionalConfigs: [
      {
        rules: {
          'unicorn/prefer-spread': 'off',
        },
      },
    ],
  })
  ```

  or deactivate all rules like this

  ```typescript
  // eslint.config.ts
  import path from 'node:path'
  import { createEslintConfig } from '@desselbane/configs/eslint'

  export default createEslintConfig({
    workspaceDir: path.join(import.meta.dirname, '..', '..', '..'),
    packageDir: import.meta.dirname,
    useUnicornPlugin: false,
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 10f3938: deps(minor): Update package eslint-plugin-prettier from 5.2.6 to 5.3.1
- 7983b6e: deps(patch): Update package zod from 3.24.3 to 3.24.4


</details>

## 12.0.0-next.7

### Major Changes

- c260702: Add the `vue3-snapshot-serializer` package and set it as the default snapshot serializer. This will most likely cause all of your snapshot tests to fail. You can safely update the snapshots or if you don't want to use the `vue3-snapshot-serializer` you can change your vitest config like so:

  ```typescript
  // Before
  export { default } from '@desselbane/configs/vitest'
  ```

  ```typescript
  // After
  import { createVitestConfig } from '@desselbane/configs/vitest'

  export default createVitestConfig({ useVue3SnapshotSerializer: false })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- efbaff2: deps(minor): Update package eslint from 9.25.1 to 9.26.0
- efbaff2: deps(minor): Update package @eslint/js from 9.25.1 to 9.26.0
- 5fa9cc9: deps(minor): Update package @types/node from 22.7.8 to 22.15.3


</details>

## 12.0.0-next.6

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 4242703: deps(peer): Update peerDependency vite from `^5.4.17 || ^6.2.5` to `^5.4.19 || ^6.3.4` in response to [CVE-2025-46565](https://nvd.nist.gov/vuln/detail/CVE-2025-46565) / [GHSA-859w-5945-r5v3](https://github.com/advisories/GHSA-859w-5945-r5v3)
- b4137d8: deps(minor): Update package eslint-plugin-import-x from 4.10.6 to 4.11.0
- 23344e3: deps(patch): Update package eslint-plugin-vue from 10.0.0 to 10.0.1
- 9b6bd48: deps(minor): Update package eslint-plugin-vue from 10.0.1 to 10.1.0
- 23dee99: deps(patch): Update package @eslint/compat from 1.2.8 to 1.2.9
- 24ddb64: deps(patch): Update package typescript-eslint from 8.31.0 to 8.31.1
- d9e7e7d: deps(patch): Update package vite from 6.3.2 to 6.3.3
- 4242703: deps(patch): Update package vite from 6.3.3 to 6.3.4
- 6b26c2e: deps: Updated lockfile
- ab59d2c: deps: Updated lockfile


</details>

## 11.1.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 5c6a504: deps(patch): Update package eslint-import-resolver-typescript from 4.3.3 to 4.3.4
- 67d2613: deps(patch): Update package eslint from 9.25.0 to 9.25.1
- 67d2613: deps(patch): Update package @eslint/js from 9.25.0 to 9.25.1
- 67d2613: deps(minor): Update package typescript-eslint from 8.30.1 to 8.31.0
- 518362b: deps(patch): Update package vitest from 3.1.1 to 3.1.2


</details>

## 11.1.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 611668f: deps(patch): Update package eslint-import-resolver-typescript from 4.3.2 to 4.3.3
- 8199ba4: deps(patch): Update package eslint-plugin-import-x from 4.10.5 to 4.10.6


</details>

## 11.1.0-next.3

### Minor Changes

- 65fdb1f: Vitest setup: mock @vueuse/core `createSharedComposable` to be isolated for each test instance

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 9706256: deps(patch): Update package eslint-plugin-import-x from 4.10.2 to 4.10.3
- 700ff2c: deps(patch): Update package eslint-plugin-import-x from 4.10.3 to 4.10.5
- a7f19d4: deps(minor): Update package eslint from 9.24.0 to 9.25.0
- a7f19d4: deps(minor): Update package @eslint/js from 9.24.0 to 9.25.0
- 8d790f0: deps(minor): Update package typescript-eslint from 8.29.1 to 8.30.1
- 48c4ad5: deps(minor): Update package vite from 6.2.6 to 6.3.0
- 235435c: deps(patch): Update package vite from 6.3.0 to 6.3.1
- 6221b5c: deps(patch): Update package vite from 6.3.1 to 6.3.2
- 35589ce: deps(patch): Update package zod from 3.24.2 to 3.24.3
- 512461e: deps: Updated lockfile


</details>

## 11.0.1-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ff128fe: deps(patch): Update package eslint-config-prettier from 10.1.1 to 10.1.2
- 5220f40: deps(patch): Update package eslint-import-resolver-typescript from 4.3.1 to 4.3.2
- 5220f40: deps(patch): Update package eslint-plugin-import-x from 4.10.1 to 4.10.2
- 95b4a47: deps(patch): Update package typescript-eslint from 8.29.0 to 8.29.1
- d8f4ae6: deps(patch): Update package vite from 6.2.5 to 6.2.6
- 776bdc5: deps: Updated lockfile


</details>

## 11.0.1-next.1

### Patch Changes

- 8b575a9: Fix package url. This should display changelogs in renovate.

## 11.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 036e104: deps(patch): Update package eslint-plugin-import-x from 4.10.0 to 4.10.1
- eaaebc0: deps(minor): Update package eslint from 9.23.0 to 9.24.0
- eaaebc0: deps(minor): Update package @eslint/js from 9.23.0 to 9.24.0
- 291257a: deps(patch): Update package typescript from 5.8.2 to 5.8.3
- 0b6fdcd: deps(patch): Update package vue-eslint-parser from 10.1.2 to 10.1.3


</details>

## 11.0.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- a658053: deps(peer): Update peerDependency vite from "^5.4.16 || ^6.2.4" to "^5.4.17 || ^6.2.5" in response to CVE-2025-31486 / GHSA-xcj6-pq6g-qj4x


</details>

## 10.0.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cef14a7: deps(peer): Update peerDependency vite from `"^5.4.16 || ^6.2.4"` to `"^5.4.17 || ^6.2.5"` in response to [CVE-2025-31486](https://nvd.nist.gov/vuln/detail/CVE-2025-31486) / [GHSA-xcj6-pq6g-qj4x](https://github.com/advisories/GHSA-xcj6-pq6g-qj4x)
- 9ad1eb5: deps(patch): Update package eslint-plugin-prettier from 5.2.5 to 5.2.6
- e98131a: deps(patch): Update package @eslint/compat from 1.2.7 to 1.2.8
- cef14a7: deps(patch): Update package vite from 6.2.4 to 6.2.5
- d164823: deps(patch): Update package vue-eslint-parser from 10.1.1 to 10.1.2
- e3f3a2e: deps: Updated lockfile


</details>

## 10.0.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- abc8c38: deps(minor): Update package eslint-plugin-import-x from 4.9.4 to 4.10.0
- 1ff86b9: deps(minor): Update package typescript-eslint from 8.28.0 to 8.29.0
- ac02be0: deps(minor): Update package vitest from 3.0.9 to 3.1.1


</details>

## 10.0.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- abc8c38: deps(minor): Update package eslint-plugin-import-x from 4.9.4 to 4.10.0
- 1ff86b9: deps(minor): Update package typescript-eslint from 8.28.0 to 8.29.0
- ac02be0: deps(minor): Update package vitest from 3.0.9 to 3.1.1


</details>

## 10.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6bae1d8: deps(minor): Update package eslint-import-resolver-typescript from 4.2.7 to 4.3.1
- c31da06: deps(patch): Update package eslint-plugin-import-x from 4.9.3 to 4.9.4


</details>

## 10.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6bae1d8: deps(minor): Update package eslint-import-resolver-typescript from 4.2.7 to 4.3.1
- c31da06: deps(patch): Update package eslint-plugin-import-x from 4.9.3 to 4.9.4


</details>

## 10.0.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ec687ca: deps(peer): Update peerDependency vite from `"^5.4.15 || ^6.2.3"` to `"^5.4.16 || ^6.2.4"` in response to [CVE-2025-31125](https://nvd.nist.gov/vuln/detail/CVE-2025-31125) / [GHSA-4r4m-qw57-chr8](https://github.com/advisories/GHSA-4r4m-qw57-chr8)
- c1c1e84: deps(patch): Update package eslint-import-resolver-typescript from 4.2.5 to 4.2.7
- ec687ca: deps(patch): Update package vite from 6.2.3 to 6.2.4


</details>

## 10.0.0-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ec687ca: deps(peer): Update peerDependency vite from `"^5.4.15 || ^6.2.3"` to `"^5.4.16 || ^6.2.4"` in response to [CVE-2025-31125](https://nvd.nist.gov/vuln/detail/CVE-2025-31125) / [GHSA-4r4m-qw57-chr8](https://github.com/advisories/GHSA-4r4m-qw57-chr8)
- c1c1e84: deps(patch): Update package eslint-import-resolver-typescript from 4.2.5 to 4.2.7
- ec687ca: deps(patch): Update package vite from 6.2.3 to 6.2.4


</details>

## 9.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6c39ebf: deps(major): Update package eslint-import-resolver-typescript from 3.9.1 to 4.2.2
- b2350b9: deps(patch): Update package eslint-import-resolver-typescript from 4.2.2 to 4.2.3
- 3152c6a: deps(patch): Update package eslint-import-resolver-typescript from 4.2.3 to 4.2.5
- b2350b9: deps(patch): Update package eslint-plugin-import-x from 4.9.1 to 4.9.2
- 3152c6a: deps(patch): Update package eslint-plugin-import-x from 4.9.2 to 4.9.3
- f9cbc51: deps(patch): Update package eslint-plugin-prettier from 5.2.3 to 5.2.4
- 6ee4c0f: deps(patch): Update package eslint-plugin-prettier from 5.2.4 to 5.2.5
- efa0823: deps(minor): Update package typescript-eslint from 8.27.0 to 8.28.0
- 501554c: deps: Updated lockfile


</details>

## 9.0.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6c39ebf: deps(major): Update package eslint-import-resolver-typescript from 3.9.1 to 4.2.2
- b2350b9: deps(patch): Update package eslint-import-resolver-typescript from 4.2.2 to 4.2.3
- 3152c6a: deps(patch): Update package eslint-import-resolver-typescript from 4.2.3 to 4.2.5
- b2350b9: deps(patch): Update package eslint-plugin-import-x from 4.9.1 to 4.9.2
- 3152c6a: deps(patch): Update package eslint-plugin-import-x from 4.9.2 to 4.9.3
- 6ee4c0f: deps(patch): Update package eslint-plugin-prettier from 5.2.4 to 5.2.5
- efa0823: deps(minor): Update package typescript-eslint from 8.27.0 to 8.28.0
- 501554c: deps: Updated lockfile


</details>

## 9.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f9cbc51: deps(patch): Update package eslint-plugin-prettier from 5.2.3 to 5.2.4


</details>

## 9.0.0

### Major Changes

- 467c7b1: Potentially Breaking: `@vue/test-utils` set `config.global.renderStubDefaultSlot = true`. This will result in the default slot being rendered even for `shallowMount`ed components. This might cause tests to fail as snapshots will look different. Also this might include code which was not included before causing a test failure. You can set it to `false` in a vitest setup file, before a test or on mount. For more info see [test-utils config](https://test-utils.vuejs.org/api/#config-global) and [test-utils renderStupDefaultSlot](https://test-utils.vuejs.org/api/#global-renderStubDefaultSlot) docs.

### Minor Changes

- 467c7b1: Allow customization of the file match for test files using the `testMatch` option.

  Matching files as test files will deactivate certain rules to allow e.g. `any` in your test code. By default, it is set to `['**/*.spec.ts', '**/*.test.ts', '**/__mocks__/**/*.ts']`

### Patch Changes

- 467c7b1: Fix hoisting issue of mocked vue-i18n

## 9.0.0-next.0

### Major Changes

- 467c7b1: Potentially Breaking: `@vue/test-utils` set `config.global.renderStubDefaultSlot = true`. This will result in the default slot being rendered even for `shallowMount`ed components. This might cause tests to fail as snapshots will look different. Also this might include code which was not included before causing a test failure. You can set it to `false` in a vitest setup file, before a test or on mount. For more info see [test-utils config](https://test-utils.vuejs.org/api/#config-global) and [test-utils renderStupDefaultSlot](https://test-utils.vuejs.org/api/#global-renderStubDefaultSlot) docs.

### Minor Changes

- 467c7b1: Allow customization of the file match for test files using the `testMatch` option.

  Matching files as test files will deactivate certain rules to allow e.g. `any` in your test code. By default, it is set to `['**/*.spec.ts', '**/*.test.ts', '**/__mocks__/**/*.ts']`

### Patch Changes

- 467c7b1: Fix hoisting issue of mocked vue-i18n

## 8.0.0

### Major Changes

- e55c85b: SECURITY, deps(peerDependency): Update package peerDependency vite from `"^5.4.12 || ^6.0.9"` to `"^5.4.15 || ^6.2.3"` in response to [CVE-2025-30208](https://nvd.nist.gov/vuln/detail/CVE-2025-30208) / [GHSA-x574-m823-4x7w](https://github.com/advisories/GHSA-x574-m823-4x7w)

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 0f997cc: deps(minor): Update package eslint from 9.22.0 to 9.23.0
- 0f997cc: deps(minor): Update package @eslint/js from 9.22.0 to 9.23.0
- e55c85b: deps(patch): Update package vite from 6.2.2 to 6.2.3


</details>

## 8.0.0-next.0

### Major Changes

- e55c85b: SECURITY, deps(peerDependency): Update package peerDependency vite from `"^5.4.12 || ^6.0.9"` to `"^5.4.15 || ^6.2.3"` in response to [CVE-2025-30208](https://nvd.nist.gov/vuln/detail/CVE-2025-30208) / [GHSA-x574-m823-4x7w](https://github.com/advisories/GHSA-x574-m823-4x7w)

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 0f997cc: deps(minor): Update package eslint from 9.22.0 to 9.23.0
- 0f997cc: deps(minor): Update package @eslint/js from 9.22.0 to 9.23.0
- e55c85b: deps(patch): Update package vite from 6.2.2 to 6.2.3


</details>

## 7.3.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 624fbb6: deps(minor): Update package eslint-import-resolver-typescript from 3.8.7 to 3.9.0
- 1767760: deps(patch): Update package eslint-import-resolver-typescript from 3.9.0 to 3.9.1
- d5c7662: deps(minor): Update package eslint-plugin-import-x from 4.6.1 to 4.7.0
- 8fba09a: deps(patch): Update package eslint-plugin-import-x from 4.7.0 to 4.7.1
- ad26a62: deps(patch): Update package eslint-plugin-import-x from 4.7.1 to 4.7.2
- a9a321b: deps(minor): Update package eslint-plugin-import-x from 4.7.2 to 4.8.0
- 558de73: deps(minor): Update package eslint-plugin-import-x from 4.8.0 to 4.9.0
- 01ef5f5: deps(patch): Update package eslint-plugin-import-x from 4.9.0 to 4.9.1
- 33e7ea3: deps(minor): Update package typescript-eslint from 8.26.1 to 8.27.0
- 392f722: deps(patch): Update package vitest from 3.0.8 to 3.0.9
- 3c7503e: deps: Updated lockfile


</details>

## 7.3.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 178a15c: deps(minor): Update package eslint-config-prettier from 10.0.2 to 10.1.1
- 37ec7e7: deps(patch): Update package eslint-import-resolver-typescript from 3.8.3 to 3.8.4
- f740a59: deps(patch): Update package eslint-import-resolver-typescript from 3.8.4 to 3.8.5
- 99d1b79: deps(patch): Update package eslint-import-resolver-typescript from 3.8.5 to 3.8.6
- 6077906: deps(patch): Update package eslint-import-resolver-typescript from 3.8.6 to 3.8.7
- 1cfd224: deps(minor): Update package eslint-plugin-vue from 9.32.0 to 9.33.0
- 00bc0b1: deps(major): Update package eslint-plugin-vue from 9.33.0 to 10.0.0
- 178a15c: deps(minor): Update package eslint from 9.21.0 to 9.22.0
- 178a15c: deps(minor): Update package @eslint/js from 9.21.0 to 9.22.0
- 2e8f0b4: deps(patch): Update package typescript-eslint from 8.26.0 to 8.26.1
- fec6e1a: deps(patch): Update package vite from 6.2.0 to 6.2.1
- 7956a46: deps(patch): Update package vite from 6.2.1 to 6.2.2
- 01847dc: deps(patch): Update package vitest from 3.0.6 to 3.0.8
- 03cceef: deps(minor): Update package @vue/eslint-config-typescript from 14.4.0 to 14.5.0
- 0073852: deps: Updated lockfile
- 3b1f91c: deps: Updated lockfile


</details>

## 7.3.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 178a15c: deps(minor): Update package eslint-config-prettier from 10.0.2 to 10.1.1
- 37ec7e7: deps(patch): Update package eslint-import-resolver-typescript from 3.8.3 to 3.8.4
- f740a59: deps(patch): Update package eslint-import-resolver-typescript from 3.8.4 to 3.8.5
- 99d1b79: deps(patch): Update package eslint-import-resolver-typescript from 3.8.5 to 3.8.6
- 6077906: deps(patch): Update package eslint-import-resolver-typescript from 3.8.6 to 3.8.7
- 1cfd224: deps(minor): Update package eslint-plugin-vue from 9.32.0 to 9.33.0
- 00bc0b1: deps(major): Update package eslint-plugin-vue from 9.33.0 to 10.0.0
- 178a15c: deps(minor): Update package eslint from 9.21.0 to 9.22.0
- 178a15c: deps(minor): Update package @eslint/js from 9.21.0 to 9.22.0
- 2e8f0b4: deps(patch): Update package typescript-eslint from 8.26.0 to 8.26.1
- fec6e1a: deps(patch): Update package vite from 6.2.0 to 6.2.1
- 7956a46: deps(patch): Update package vite from 6.2.1 to 6.2.2
- 03cceef: deps(minor): Update package @vue/eslint-config-typescript from 14.4.0 to 14.5.0
- 0073852: deps: Updated lockfile
- 3b1f91c: deps: Updated lockfile


</details>

## 7.3.0

### Minor Changes

- 1c386f5: Automatically mock `vue-i18n` `$t` function
- 1c386f5: DEPRECATION: Instead of using `createTsupConfig` create default options using `createDefaultOptions`.

  ```ts
  // Before
  export default createTsupConfig({
    entry: ['src/*.ts', '!src/*.d.ts'],
    tsconfig: 'tsconfig.lib.json',
    supportCjs: true,
    platform: 'node',
    external: ['@vue/test-utils'],
  })

  // After
  import { defineConfig } from 'tsup'
  import { createDefaultOptions } from '@desselbane/configs/tsup'

  export default defineConfig({
    ...createDefaultOptions({
      supportCjs: true,
    }),
    entry: ['src/*.ts', '!src/*.d.ts'],
    tsconfig: 'tsconfig.lib.json',
    platform: 'node',
    external: ['@vue/test-utils'],
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 56f063b: deps(patch): Update package eslint-config-prettier from 10.0.1 to 10.0.2
- 60a92ca: deps(minor): Update package eslint-import-resolver-typescript from 3.7.0 to 3.8.0
- d04a622: deps(patch): Update package eslint-import-resolver-typescript from 3.8.0 to 3.8.1
- 8bc2f15: deps(patch): Update package eslint-import-resolver-typescript from 3.8.1 to 3.8.2
- e2f492b: deps(patch): Update package eslint-import-resolver-typescript from 3.8.2 to 3.8.3
- aa1022e: deps(minor): Update package eslint from 9.20.1 to 9.21.0
- aa1022e: deps(patch): Update package @eslint/compat from 1.2.6 to 1.2.7
- aa1022e: deps(minor): Update package @eslint/js from 9.20.0 to 9.21.0
- 922dd12: deps(patch): Update package prettier from 3.5.0 to 3.5.1
- 3a8e06c: deps(patch): Update package prettier from 3.5.1 to 3.5.2
- 98f13e1: deps(patch): Update package prettier from 3.5.2 to 3.5.3
- d24e347: deps(minor): Update package tsup from 8.3.6 to 8.4.0
- f2e252d: deps(major): Update package @types/eslint\_\_js from 8.42.3 to 9.14.0
- a112516: deps(patch): Update package typescript-eslint from 8.24.0 to 8.24.1
- b182431: deps(minor): Update package typescript-eslint from 8.24.1 to 8.25.0
- 3f084e4: deps(minor): Update package typescript-eslint from 8.25.0 to 8.26.0
- 5082310: deps(minor): Update package typescript from 5.7.3 to 5.8.2
- be1c60e: deps(patch): Update package vite from 6.1.0 to 6.1.1
- 8dbff01: deps(minor): Update package vite from 6.1.1 to 6.2.0
- 4dc8e96: deps(patch): Update package vitest from 3.0.5 to 3.0.6
- 107fd8f: deps: Updated lockfile
- 026188c: deps: Updated lockfile
- 09c7357: deps: Updated lockfile


</details>

## 7.3.0-next.1

### Minor Changes

- 1c386f5: Automatically mock `vue-i18n` `$t` function
- 1c386f5: DEPRECATION: Instead of using `createTsupConfig` create default options using `createDefaultOptions`.

  ```ts
  // Before
  export default createTsupConfig({
    entry: ['src/*.ts', '!src/*.d.ts'],
    tsconfig: 'tsconfig.lib.json',
    supportCjs: true,
    platform: 'node',
    external: ['@vue/test-utils'],
  })

  // After
  import { defineConfig } from 'tsup'
  import { createDefaultOptions } from '@desselbane/configs/tsup'

  export default defineConfig({
    ...createDefaultOptions({
      supportCjs: true,
    }),
    entry: ['src/*.ts', '!src/*.d.ts'],
    tsconfig: 'tsconfig.lib.json',
    platform: 'node',
    external: ['@vue/test-utils'],
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 98f13e1: deps(patch): Update package prettier from 3.5.2 to 3.5.3
- 3f084e4: deps(minor): Update package typescript-eslint from 8.25.0 to 8.26.0


</details>

## 7.2.3-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 56f063b: deps(patch): Update package eslint-config-prettier from 10.0.1 to 10.0.2
- 60a92ca: deps(minor): Update package eslint-import-resolver-typescript from 3.7.0 to 3.8.0
- d04a622: deps(patch): Update package eslint-import-resolver-typescript from 3.8.0 to 3.8.1
- 8bc2f15: deps(patch): Update package eslint-import-resolver-typescript from 3.8.1 to 3.8.2
- e2f492b: deps(patch): Update package eslint-import-resolver-typescript from 3.8.2 to 3.8.3
- aa1022e: deps(minor): Update package eslint from 9.20.1 to 9.21.0
- aa1022e: deps(patch): Update package @eslint/compat from 1.2.6 to 1.2.7
- aa1022e: deps(minor): Update package @eslint/js from 9.20.0 to 9.21.0
- 922dd12: deps(patch): Update package prettier from 3.5.0 to 3.5.1
- 3a8e06c: deps(patch): Update package prettier from 3.5.1 to 3.5.2
- d24e347: deps(minor): Update package tsup from 8.3.6 to 8.4.0
- f2e252d: deps(major): Update package @types/eslint\_\_js from 8.42.3 to 9.14.0
- a112516: deps(patch): Update package typescript-eslint from 8.24.0 to 8.24.1
- b182431: deps(minor): Update package typescript-eslint from 8.24.1 to 8.25.0
- 5082310: deps(minor): Update package typescript from 5.7.3 to 5.8.2
- be1c60e: deps(patch): Update package vite from 6.1.0 to 6.1.1
- 8dbff01: deps(minor): Update package vite from 6.1.1 to 6.2.0
- 4dc8e96: deps(patch): Update package vitest from 3.0.5 to 3.0.6
- 107fd8f: deps: Updated lockfile
- 026188c: deps: Updated lockfile
- 09c7357: deps: Updated lockfile


</details>

## 7.2.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b9ad6a3: deps(patch): Update package eslint from 9.20.0 to 9.20.1
- 1c28daa: deps(patch): Update package zod from 3.24.1 to 3.24.2


</details>

## 7.2.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 3821144: deps(minor): Update package typescript-eslint from 8.23.0 to 8.24.0


</details>

## 7.2.0

### Minor Changes

- 04c3cc8: Add `noExternal` option to `createTsupConfig`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b163e88: deps(minor): Update package eslint from 9.19.0 to 9.20.0
- b163e88: deps(minor): Update package @eslint/js from 9.19.0 to 9.20.0
- 8612ea2: deps(minor): Update package prettier from 3.4.2 to 3.5.0
- f3c0d7f: deps(minor): Update package typescript-eslint from 8.22.0 to 8.23.0
- 8d8279b: deps(minor): Update package vite from 6.0.11 to 6.1.0
- 93c2a8c: deps(minor): Update package @vue/eslint-config-typescript from 14.3.0 to 14.4.0
- 0906d09: deps: Updated lockfile


</details>

## 7.2.0-next.1

### Minor Changes

- 04c3cc8: Add `noExternal` option to `createTsupConfig`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8612ea2: deps(minor): Update package prettier from 3.4.2 to 3.5.0
- 93c2a8c: deps(minor): Update package @vue/eslint-config-typescript from 14.3.0 to 14.4.0


</details>

## 7.1.2-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b163e88: deps(minor): Update package eslint from 9.19.0 to 9.20.0
- b163e88: deps(minor): Update package @eslint/js from 9.19.0 to 9.20.0
- f3c0d7f: deps(minor): Update package typescript-eslint from 8.22.0 to 8.23.0
- 8d8279b: deps(minor): Update package vite from 6.0.11 to 6.1.0
- 0906d09: deps: Updated lockfile


</details>

## 7.1.1

### Patch Changes

- 73a50c0: Update peerDependency `vitest` to version `^2.1.9 || ^3.0.5` in response to [CVE-2025-24964](https://nvd.nist.gov/vuln/detail/CVE-2025-24964) / [GHSA-9crc-q9x8-hgqq](https://github.com/advisories/GHSA-9crc-q9x8-hgqq)

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 73a50c0: deps(patch): Update package vitest from 3.0.4 to 3.0.5


</details>

## 7.1.0

### Minor Changes

- 63d6012: Add `dts` option to `createTsupConfig` options. With this you can turn off dts generation if its not needed for your project. As its generally helpfull the default value will generate declaration files.
- 63d6012: Add support for coverage. When using the `--coverage` option each project still needs to install the `@vitest/coverage-v8` package.

### Patch Changes

- 39230a1: Fix repository field in package.json

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 45bb74c: deps(patch): Update package @eslint/compat from 1.2.5 to 1.2.6
- 46254c4: deps(patch): Update package tsup from 8.3.5 to 8.3.6
- e456726: deps(minor): Update package typescript-eslint from 8.21.0 to 8.22.0
- eca6687: deps: Updated lockfile


</details>

## 7.1.0-next.3

### Minor Changes

- 63d6012: Add `dts` option to `createTsupConfig` options. With this you can turn off dts generation if its not needed for your project. As its generally helpfull the default value will generate declaration files.
- 63d6012: Add support for coverage. When using the `--coverage` option each project still needs to install the `@vitest/coverage-v8` package.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 45bb74c: deps(patch): Update package @eslint/compat from 1.2.5 to 1.2.6


</details>

## 7.0.1-next.2

### Patch Changes

- 39230a1: Fix repository field in package.json

### Dependency Changes

<details>
<summary> Click to expand </summary>

- eca6687: deps: Updated lockfile


</details>

## 7.0.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e456726: deps(minor): Update package typescript-eslint from 8.21.0 to 8.22.0


</details>

## 7.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 46254c4: deps(patch): Update package tsup from 8.3.5 to 8.3.6


</details>

## 7.0.0

### Major Changes

- 77e37c9: Shortend imports.

  The following imports have changed
  - `@desselbane/configs/eslint.config.tpl.js` => `@desselbane/configs/eslint`
  - `@desselbane/configs/prettier.config.tpl.js` => `@desselbane/configs/prettier`
  - `@desselbane/configs/tsup.config.tpl.js` => `@desselbane/configs/tsup`
  - `@desselbane/configs/vitest.config.tpl.js` => `@desselbane/configs/vitest`

### Minor Changes

- 20eaf49: enable tsup cjsInterop when specifying supportCjs
- 77e37c9: Add jiti in order to natively support `eslint.config.ts` files. Using a ts file is now the recommendation.

### Patch Changes

- 77e37c9: Correctly export cjs types

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f5a7b1b: deps(minor): Update package eslint-plugin-playwright from 2.1.0 to 2.2.0
- 99cf555: deps(minor): Update package eslint from 9.18.0 to 9.19.0
- 99cf555: deps(minor): Update package @eslint/js from 9.18.0 to 9.19.0
- 8da7ea7: deps(minor): Update package typescript-eslint from 8.20.0 to 8.21.0
- 61a82e9: deps(patch): Update package vite from 6.0.10 to 6.0.11
- 343d506: deps(patch): Update package vite from 6.0.9 to 6.0.10
- bf07edf: deps(patch): Update package vitest from 3.0.2 to 3.0.3
- 88994d8: deps(patch): Update package vitest from 3.0.3 to 3.0.4
- e07c00b: deps: Updated lockfile


</details>

## 7.0.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 88994d8: deps(patch): Update package vitest from 3.0.3 to 3.0.4
- e07c00b: deps: Updated lockfile


</details>

## 7.0.0-next.3

### Major Changes

- 77e37c9: Shortend imports.

  The following imports have changed
  - `@desselbane/configs/eslint.config.tpl.js` => `@desselbane/configs/eslint`
  - `@desselbane/configs/prettier.config.tpl.js` => `@desselbane/configs/prettier`
  - `@desselbane/configs/tsup.config.tpl.js` => `@desselbane/configs/tsup`
  - `@desselbane/configs/vitest.config.tpl.js` => `@desselbane/configs/vitest`

### Minor Changes

- 77e37c9: Add jiti in order to natively support `eslint.config.ts` files. Using a ts file is now the recommendation.

### Patch Changes

- 77e37c9: Correctly export cjs types

## 6.1.0-next.2

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f5a7b1b: deps(minor): Update package eslint-plugin-playwright from 2.1.0 to 2.2.0
- 61a82e9: deps(patch): Update package vite from 6.0.10 to 6.0.11
- bf07edf: deps(patch): Update package vitest from 3.0.2 to 3.0.3


</details>

## 6.1.0-next.1

### Minor Changes

- 20eaf49: enable tsup cjsInterop when specifying supportCjs

## 6.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8da7ea7: deps(minor): Update package typescript-eslint from 8.20.0 to 8.21.0
- 343d506: deps(patch): Update package vite from 6.0.9 to 6.0.10


</details>

## 6.0.0

### Major Changes

- 98fa1f3: Turn on splitting by default. This may break your build (even though the chances are low). If it does you can set `splitting: false` in the options for `createTsupConfig()`.
- 1096e33: Eslint potential breaking change. The `@vue/eslint-config-typescript` was misconfigured in the previous verison leading to some vue rules not triggering. This is fixed now but it might lead to linting errors. You can always turn off the rules but it is recommended to fix the linting errors.
- 5f44913: Incresed vite peerDependency to `^5.4.12 || ^6.0.9` in order to mitigate [CVE-2025-24010](https://nvd.nist.gov/vuln/detail/CVE-2025-24010) / [GHSA-vg6x-rcgg-rjx6](https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6).

  # Summary

  Vite allowed any websites to send any requests to the development server and read the response due to default CORS settings and lack of validation on the Origin header for WebSocket connections.

  For more info see [GHSA-vg6x-rcgg-rjx6](https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6)

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 1096e33: deps(patch): Update package eslint-plugin-prettier from 5.2.1 to 5.2.2
- c5a0c87: deps(patch): Update package eslint-plugin-prettier from 5.2.2 to 5.2.3
- 5f44913: deps(patch): Update package vite from 6.0.7 to 6.0.9
- 9e47a6b: deps(patch): Update package vitest from 3.0.1 to 3.0.2
- 1096e33: deps(minor): Update package @vue/eslint-config-typescript from 14.2.0 to 14.3.0
- 68ff813: deps: Updated lockfile


</details>

## 6.0.0-next.0

### Major Changes

- 98fa1f3: Turn on splitting by default. This may break your build (even though the chances are low). If it does you can set `splitting: false` in the options for `createTsupConfig()`.
- 1096e33: Eslint potential breaking change. The `@vue/eslint-config-typescript` was misconfigured in the previous verison leading to some vue rules not triggering. This is fixed now but it might lead to linting errors. You can always turn off the rules but it is recommended to fix the linting errors.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 1096e33: deps(patch): Update package eslint-plugin-prettier from 5.2.1 to 5.2.2
- c5a0c87: deps(patch): Update package eslint-plugin-prettier from 5.2.2 to 5.2.3
- 9e47a6b: deps(patch): Update package vitest from 3.0.1 to 3.0.2
- 1096e33: deps(minor): Update package @vue/eslint-config-typescript from 14.2.0 to 14.3.0
- 68ff813: deps: Updated lockfile


</details>

## 5.0.0

### Major Changes

- 859a666: Enabled `strict-boolean-expressions` (see [docs](https://typescript-eslint.io/rules/strict-boolean-expressions/)) with no exceptions.

  If this is breaking your linting you can either disable the rule or change its options like so:

  ```typescript
  // eslint.config.js
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..', '..'),
    additionalConfigs: [
      {
        rules: {
          '@typescript-eslint/strict-boolean-expressions': [
            'warn',
            {
              allowAny: false,
              allowNullableBoolean: false,
              allowNullableEnum: false,
              allowNullableNumber: false,
              allowNullableObject: false,
              allowNullableString: false,
              allowNumber: false,
              allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
              allowString: false,
            },
          ],
        },
      },
    ],
  })
  ```

### Minor Changes

- 859a666: Playwright eslint allow "frontendTest" and "bffTest" as test function names
- f36997a: Support vitest v3
- 859a666: Turn off [`@typescript-eslint/unbound-method`](https://typescript-eslint.io/rules/unbound-method/) for test files.
- 2f6cbba: Enable eslint [curly](https://eslint.org/docs/latest/rules/curly) rule
- 859a666: Turn off [@typescript-eslint/no-unsafe-return](https://typescript-eslint.io/rules/no-unsafe-return/) for test files.
- 859a666: Turn off [@typescript-eslint/only-throw-error](https://typescript-eslint.io/rules/only-throw-error/) for test files.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- da1e9a8: deps(major): Update package eslint-config-prettier from 9.1.0 to 10.0.1
- 699f103: deps(minor): Update package eslint from 9.17.0 to 9.18.0
- 699f103: deps(patch): Update package @eslint/compat from 1.2.4 to 1.2.5
- 699f103: deps(minor): Update package @eslint/js from 9.17.0 to 9.18.0
- 4f7ebd9: deps(patch): Update package typescript-eslint from 8.19.0 to 8.19.1
- 9ad7b67: deps(minor): Update package typescript-eslint from 8.19.1 to 8.20.0
- 1391225: deps(patch): Update package typescript from 5.7.2 to 5.7.3
- 93dafe5: deps: Updated lockfile


</details>

## 5.0.0-next.2

### Minor Changes

- f36997a: Support vitest v3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- da1e9a8: deps(major): Update package eslint-config-prettier from 9.1.0 to 10.0.1
- 9ad7b67: deps(minor): Update package typescript-eslint from 8.19.1 to 8.20.0


</details>

## 5.0.0-next.1

### Major Changes

- 859a666: Enabled `strict-boolean-expressions` (see [docs](https://typescript-eslint.io/rules/strict-boolean-expressions/)) with no exceptions.

  If this is breaking your linting you can either disable the rule or change its options like so:

  ```typescript
  // eslint.config.js
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..', '..'),
    additionalConfigs: [
      {
        rules: {
          '@typescript-eslint/strict-boolean-expressions': [
            'warn',
            {
              allowAny: false,
              allowNullableBoolean: false,
              allowNullableEnum: false,
              allowNullableNumber: false,
              allowNullableObject: false,
              allowNullableString: false,
              allowNumber: false,
              allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
              allowString: false,
            },
          ],
        },
      },
    ],
  })
  ```

### Minor Changes

- 859a666: Playwright eslint allow "frontendTest" and "bffTest" as test function names
- 859a666: Turn off [`@typescript-eslint/unbound-method`](https://typescript-eslint.io/rules/unbound-method/) for test files.
- 859a666: Turn off [@typescript-eslint/no-unsafe-return](https://typescript-eslint.io/rules/no-unsafe-return/) for test files.
- 859a666: Turn off [@typescript-eslint/only-throw-error](https://typescript-eslint.io/rules/only-throw-error/) for test files.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 699f103: deps(minor): Update package eslint from 9.17.0 to 9.18.0
- 699f103: deps(patch): Update package @eslint/compat from 1.2.4 to 1.2.5
- 699f103: deps(minor): Update package @eslint/js from 9.17.0 to 9.18.0


</details>

## 4.1.0-next.0

### Minor Changes

- 2f6cbba: Enable eslint [curly](https://eslint.org/docs/latest/rules/curly) rule

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 4f7ebd9: deps(patch): Update package typescript-eslint from 8.19.0 to 8.19.1
- 1391225: deps(patch): Update package typescript from 5.7.2 to 5.7.3
- 93dafe5: deps: Updated lockfile


</details>

## 4.0.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b9a2344: deps(minor): Update package eslint-plugin-import-x from 4.5.1 to 4.6.1
- 62e0036: deps(patch): Update package typescript-eslint from 8.18.0 to 8.18.1
- 7575af5: deps(patch): Update package typescript-eslint from 8.18.1 to 8.18.2
- ecc57c8: deps(minor): Update package typescript-eslint from 8.18.2 to 8.19.0
- fbdef6c: deps(minor): Update package @vue/eslint-config-typescript from 14.1.4 to 14.2.0
- 33e64af: deps: Updated lockfile
- 03831e1: deps: Updated lockfile
- 1f29167: deps: Updated lockfile


</details>

## 4.0.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- b9a2344: deps(minor): Update package eslint-plugin-import-x from 4.5.1 to 4.6.1
- 62e0036: deps(patch): Update package typescript-eslint from 8.18.0 to 8.18.1
- 7575af5: deps(patch): Update package typescript-eslint from 8.18.1 to 8.18.2
- ecc57c8: deps(minor): Update package typescript-eslint from 8.18.2 to 8.19.0
- fbdef6c: deps(minor): Update package @vue/eslint-config-typescript from 14.1.4 to 14.2.0
- 33e64af: deps: Updated lockfile
- 03831e1: deps: Updated lockfile
- 1f29167: deps: Updated lockfile


</details>

## 4.0.0

### Major Changes

- 24853bf: Remove unused import statements. Mark unused vars as error.

  As the logic of marking unused vars as error changed slightly between the the old and new eslint plugin this change might be breaking.

### Minor Changes

- 85d417d: ts eslint set @typescript-eslint/no-unnecessary-condition allowConstantLoopConditions: true

## 4.0.0-next.1

### Major Changes

- 24853bf: Remove unused import statements. Mark unused vars as error.

  As the logic of marking unused vars as error changed slightly between the the old and new eslint plugin this change might be breaking.

## 3.1.0-next.0

### Minor Changes

- 85d417d: ts eslint set @typescript-eslint/no-unnecessary-condition allowConstantLoopConditions: true

## 3.0.0

### Major Changes

- 255b0b7: Add `eslint-plugin-import-x` with its recommended and typescript rulesets

  The plugin is currently configured like this:

  ```javascript
  const config = {
    rules: {
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/no-deprecated': 'warn',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-unused-modules': 'error',
      'import-x/no-cycle': 'warn',
      'import-x/no-self-import': 'warn',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^shell$'],
        },
      ],
      'import-x/order': [
        'error',
        {
          'newlines-between': 'never',
        },
      ],
    },
  }
  ```

  This might be a breaking change or not.

- 255b0b7: `typescript-eslint` can not be deactivated anymore

  In the options for `createEslintConfig` the `typescript` property has been removed as it is no longer possible to disable the typescript plugin. The `useTypeCheckedConfig` property has been moved to the top level of the object.

  Before:

  ```javascript
  export default createEslintConfig({
    typescript: {
      // Removed
      enabled: true,
      // Moved to top level
      useTypeCheckedConfig: false,
    },
  })
  ```

  Now:

  ```javascript
  export default createEslintConfig({
    useTypeCheckedConfig: false,
  })
  ```

## 3.0.0-next.0

### Major Changes

- 255b0b7: Add `eslint-plugin-import-x` with its recommended and typescript rulesets

  The plugin is currently configured like this:

  ```javascript
  const config = {
    rules: {
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/no-deprecated': 'warn',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-unused-modules': 'error',
      'import-x/no-cycle': 'warn',
      'import-x/no-self-import': 'warn',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^shell$'],
        },
      ],
      'import-x/order': [
        'error',
        {
          'newlines-between': 'never',
        },
      ],
    },
  }
  ```

  This might be a breaking change or not.

- 255b0b7: `typescript-eslint` can not be deactivated anymore

  In the options for `createEslintConfig` the `typescript` property has been removed as it is no longer possible to disable the typescript plugin. The `useTypeCheckedConfig` property has been moved to the top level of the object.

  Before:

  ```javascript
  export default createEslintConfig({
    typescript: {
      // Removed
      enabled: true,
      // Moved to top level
      useTypeCheckedConfig: false,
    },
  })
  ```

  Now:

  ```javascript
  export default createEslintConfig({
    useTypeCheckedConfig: false,
  })
  ```

## 2.2.0

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- dc8e743: deps(minor): Update package typescript-eslint from 8.17.0 to 8.18.0
- 84b60a3: deps: Updated lockfile
- bb04fab: deps: Updated lockfile


</details>

## 2.2.0-next.3

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

## 2.2.0-next.2

### Minor Changes

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

## 2.1.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- 84b60a3: deps: Updated lockfile


</details>

## 2.1.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0


</details>

## 2.1.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.1.0-next.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.0.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 2.0.0-next.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 1.0.0

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.
- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- 63ed43e: eslint: separate type imports (auto-fix rule)
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.
- 8456d39: Test release
- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.
- 4365475: Pipeline: Do not trigger multiple pipelines on pre release

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile
- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.9

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.8

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0


</details>

## 0.3.0-next.7

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.

### Patch Changes

- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile


</details>

## 0.3.0-next.6

### Patch Changes

- 8456d39: Test release

## 0.3.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0


</details>

## 0.3.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3


</details>

## 0.3.0-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4


</details>

## 0.3.0-next.2

### Minor Changes

- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.

## 0.3.0-next.1

### Minor Changes

- 63ed43e: eslint: separate type imports (auto-fix rule)

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

- 13ca7c7: Initial Release

## 0.2.0-next.0

### Minor Changes

- 13ca7c7: Initial Release
  ],
  },
  ],
  'import-x/order': [
  'error',
  {
  'newlines-between': 'never',
  },
  ],
  },
  }

  ```

  This might be a breaking change or not.
  ```

- 255b0b7: `typescript-eslint` can not be deactivated anymore

  In the options for `createEslintConfig` the `typescript` property has been removed as it is no longer possible to disable the typescript plugin. The `useTypeCheckedConfig` property has been moved to the top level of the object.

  Before:

  ```javascript
  export default createEslintConfig({
    typescript: {
      // Removed
      enabled: true,
      // Moved to top level
      useTypeCheckedConfig: false,
    },
  })
  ```

  Now:

  ```javascript
  export default createEslintConfig({
    useTypeCheckedConfig: false,
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 235a3c7: deps(minor): Update package eslint from 9.16.0 to 9.17.0
- 235a3c7: deps(minor): Update package @eslint/js from 9.16.0 to 9.17.0
- 7d51325: deps(minor): Update package typescript from 5.6.3 to 5.7.2


</details>

## 2.2.0

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- dc8e743: deps(minor): Update package typescript-eslint from 8.17.0 to 8.18.0
- 84b60a3: deps: Updated lockfile
- bb04fab: deps: Updated lockfile


</details>

## 2.2.0-next.3

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

## 2.2.0-next.2

### Minor Changes

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

## 2.1.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- 84b60a3: deps: Updated lockfile


</details>

## 2.1.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0


</details>

## 2.1.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.1.0-next.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.0.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 2.0.0-next.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 1.0.0

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.
- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- 63ed43e: eslint: separate type imports (auto-fix rule)
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.
- 8456d39: Test release
- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.
- 4365475: Pipeline: Do not trigger multiple pipelines on pre release

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile
- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.9

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.8

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0


</details>

## 0.3.0-next.7

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.

### Patch Changes

- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile


</details>

## 0.3.0-next.6

### Patch Changes

- 8456d39: Test release

## 0.3.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0


</details>

## 0.3.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3


</details>

## 0.3.0-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4


</details>

## 0.3.0-next.2

### Minor Changes

- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.

## 0.3.0-next.1

### Minor Changes

- 63ed43e: eslint: separate type imports (auto-fix rule)

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

- 13ca7c7: Initial Release

## 0.2.0-next.0

### Minor Changes

- 13ca7c7: Initial Release
  ],
  },
  ],
  'import-x/order': [
  'error',
  {
  'newlines-between': 'never',
  },
  ],
  },
  }

  ```

  This might be a breaking change or not.
  ```

- 255b0b7: `typescript-eslint` can not be deactivated anymore

  In the options for `createEslintConfig` the `typescript` property has been removed as it is no longer possible to disable the typescript plugin. The `useTypeCheckedConfig` property has been moved to the top level of the object.

  Before:

  ```javascript
  export default createEslintConfig({
    typescript: {
      // Removed
      enabled: true,
      // Moved to top level
      useTypeCheckedConfig: false,
    },
  })
  ```

  Now:

  ```javascript
  export default createEslintConfig({
    useTypeCheckedConfig: false,
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 235a3c7: deps(minor): Update package eslint from 9.16.0 to 9.17.0
- 235a3c7: deps(minor): Update package @eslint/js from 9.16.0 to 9.17.0
- 7d51325: deps(minor): Update package typescript from 5.6.3 to 5.7.2


</details>

## 3.0.0-next.0

### Major Changes

- 255b0b7: Add `eslint-plugin-import-x` with its recommended and typescript rulesets

  The plugin is currently configured like this:

  ```javascript
  const config = {
    rules: {
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/no-deprecated': 'warn',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-unused-modules': 'error',
      'import-x/no-cycle': 'warn',
      'import-x/no-self-import': 'warn',
      'import-x/first': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/no-anonymous-default-export': 'error',
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^shell
  ```

## 2.2.0

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- dc8e743: deps(minor): Update package typescript-eslint from 8.17.0 to 8.18.0
- 84b60a3: deps: Updated lockfile
- bb04fab: deps: Updated lockfile


</details>

## 2.2.0-next.3

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

## 2.2.0-next.2

### Minor Changes

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

## 2.1.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- 84b60a3: deps: Updated lockfile


</details>

## 2.1.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0


</details>

## 2.1.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.1.0-next.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.0.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 2.0.0-next.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 1.0.0

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.
- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- 63ed43e: eslint: separate type imports (auto-fix rule)
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.
- 8456d39: Test release
- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.
- 4365475: Pipeline: Do not trigger multiple pipelines on pre release

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile
- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.9

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.8

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0


</details>

## 0.3.0-next.7

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.

### Patch Changes

- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile


</details>

## 0.3.0-next.6

### Patch Changes

- 8456d39: Test release

## 0.3.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0


</details>

## 0.3.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3


</details>

## 0.3.0-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4


</details>

## 0.3.0-next.2

### Minor Changes

- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.

## 0.3.0-next.1

### Minor Changes

- 63ed43e: eslint: separate type imports (auto-fix rule)

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

- 13ca7c7: Initial Release

## 0.2.0-next.0

### Minor Changes

- 13ca7c7: Initial Release
  ],
  },
  ],
  'import-x/order': [
  'error',
  {
  'newlines-between': 'never',
  },
  ],
  },
  }

  ```

  This might be a breaking change or not.
  ```

- 255b0b7: `typescript-eslint` can not be deactivated anymore

  In the options for `createEslintConfig` the `typescript` property has been removed as it is no longer possible to disable the typescript plugin. The `useTypeCheckedConfig` property has been moved to the top level of the object.

  Before:

  ```javascript
  export default createEslintConfig({
    typescript: {
      // Removed
      enabled: true,
      // Moved to top level
      useTypeCheckedConfig: false,
    },
  })
  ```

  Now:

  ```javascript
  export default createEslintConfig({
    useTypeCheckedConfig: false,
  })
  ```

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 235a3c7: deps(minor): Update package eslint from 9.16.0 to 9.17.0
- 235a3c7: deps(minor): Update package @eslint/js from 9.16.0 to 9.17.0
- 7d51325: deps(minor): Update package typescript from 5.6.3 to 5.7.2


</details>

## 2.2.0

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- dc8e743: deps(minor): Update package typescript-eslint from 8.17.0 to 8.18.0
- 84b60a3: deps: Updated lockfile
- bb04fab: deps: Updated lockfile


</details>

## 2.2.0-next.3

### Minor Changes

- b71c46a: Allow for additional config objects in options

  Before if you wanted to customize specific eslint rules you had to do something like this

  ```javascript
  export default [
    ...createEslintConfig({
      packageDir: import.meta.dirname,
      workspaceDir: join(import.meta.dirname, '..', '..'),
    }),
    // And since we are in JS there would be no type inference here
    {
      rules: {
        'my-rule': 'error',
      },
    },
  ]
  ```

  Now it is possible to write it like this

  ```javascript
  export default createEslintConfig({
    packageDir: import.meta.dirname,
    workspaceDir: join(import.meta.dirname, '..', '..'),
    // Since this property is typed you should get type inference here
    additionalConfigs: [
      {
        rules: {
          'my-rule': 'error',
        },
      },
    ],
  })
  ```

## 2.2.0-next.2

### Minor Changes

- 1c3d3d2: Add setup as global test alias in playwright eslint config

### Patch Changes

- 1c3d3d2: Apply @typescript-eslint/restrict-template-expressions for vue file as well
- 1c3d3d2: Include vite ^6 into peerDependency range

## 2.1.1-next.1

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 8cc1fd3: deps(patch): Update package @eslint/compat from 1.2.3 to 1.2.4
- 0e68083: deps(patch): Update package prettier from 3.4.1 to 3.4.2
- e26badb: deps(minor): Update package typescript-eslint from 8.16.0 to 8.17.0
- 84b60a3: deps: Updated lockfile


</details>

## 2.1.1-next.0

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 6405d58: deps(minor): Update package eslint-plugin-vue from 9.31.0 to 9.32.0
- 5c77468: deps(minor): Update package eslint from 9.15.0 to 9.16.0
- 5c77468: deps(minor): Update package @eslint/js from 9.15.0 to 9.16.0


</details>

## 2.1.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.1.0-next.0

### Minor Changes

- 238b98e: Add a tsup.config.tpl.js

  This is a basic [`tsup`](https://tsup.egoist.dev/#install) config which by default targets `esm` and the `neutral` platform.

  Place a `tsup.config.js` file next to your `package.json` with the following content:

  ```javascript
  import { createTsupConfig } from '@desselbane/configs/tsup.config.tpl.js'

  export default createTsupConfig({
    tsconfig: 'tsconfig.lib.json',
  })
  ```

  For more info on what you can pass as options to the `createTsupConfig` function consult the type docs.

- 238b98e: Allow any,boolean,nullish,number and regexp in template strings
- 238b98e: Turn off `@typescript-eslint/no-non-null-assertion` for test files

### Patch Changes

- 238b98e: Disable @typescript-eslint/no-invalid-void-type until https://github.com/typescript-eslint/typescript-eslint/issues/10418 is resolved
- 238b98e: Update `README.md` about `tsconfig.configs.json` to prevent `TS2742`

  Config files should not generate declaration files so their `compilerOptions.declaration` should be set to `false`. If the tsconfig has `compilerOptions.declaration` set to `true` the typescript checker will complain that the return type of some config functions (e.g. `createTsupConfig()`) is not portable, which is correct but for config files irrelevant. The error looks something like: `TS2742: The inferred type of default cannot be named without a reference to ../configs/node_modules/tsup/dist/index. js. This is likely not portable. A type annotation is necessary.`

### Dependency Changes

<details>
<summary> Click to expand </summary>

- f920884: deps(minor): Update package prettier from 3.3.3 to 3.4.1
- 5ab3076: deps(minor): Update package typescript-eslint from 8.15.0 to 8.16.0
- 5ab3076: deps(patch): Update package @vue/eslint-config-typescript from 14.1.3 to 14.1.4
- 4050981: deps: Updated lockfile


</details>

## 2.0.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 2.0.0-next.0

### Major Changes

- 5146685: Rename `tsconfig.web.json` into `tsconfig.bundler-web.json`.

### Minor Changes

- 5146685: Support cjs
- 5146685: Describe how to use the package with a README.md
- 5146685: [Internal] Show live output of package generation script from turbo generator
- 5146685: Add tsconfig.bundler-node.tpl.json as default config for bff projects which use tsup.

### Patch Changes

- 5146685: Move files into src folder and use tsup to build project
- 5146685: Remove global resolution of workspace .gitignore

## 1.0.0

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.
- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- 63ed43e: eslint: separate type imports (auto-fix rule)
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.
- 8456d39: Test release
- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.
- 4365475: Pipeline: Do not trigger multiple pipelines on pre release

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile
- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.9

### Dependency Changes

<details>
<summary> Click to expand </summary>

- cdf2c06: deps: Updated lockfile


</details>

## 1.0.0-next.8

### Major Changes

- 1fa9d1b: Reworked API of `eslint.config.tpl.ts`. It is now a typescript file which gets built. It now exposes only one method called `createEslintConfig` which takes in a single options argument.

  Default use case is to only set the `packageDir` option

  ```typescript
  import { createEslintConfig } from '@desselbane/configs/eslint.config.tpl.js'
  export default createEslintConfig({ packageDir: import.meta.dirname })
  ```

  But it also has `vue` and `playwright` options.

- 1fa9d1b: Set the [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess) tsconfig prop to `true`. Whenever an index is accessed typescript now will also include `undefined` in the return type.

### Minor Changes

- 1fa9d1b: Add eslint-plugin-playwright with the recommended config
- ac94448: Include `CHANGELOG.md` in npm tarball
- ac94448: Automatically bundle `@repo` packages for tsup packages which are published
- 1fa9d1b: Always bundle imports starting with `#`
- ac94448: Update package.json.hbs to include `CHANGELOG.md` and export types explicitly

### Dependency Changes

<details>
<summary> Click to expand </summary>

- e795938: deps(minor): Update package eslint from 9.14.0 to 9.15.0
- e795938: deps(minor): Update package @eslint/js from 9.14.0 to 9.15.0


</details>

## 0.3.0-next.7

### Minor Changes

- 4365475: Ignore `@typescript-eslint/no-unsafe-...` rules in test files.

### Patch Changes

- 4365475: Turn off concurrent tests as they mess with spys declared on describe level.

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 47ed44e: deps(minor): Update package eslint-plugin-vue from 9.30.0 to 9.31.0
- 6a30cf2: deps(patch): Update package @eslint/compat from 1.2.2 to 1.2.3
- 142b736: deps(minor): Update package typescript-eslint from 8.12.2 to 8.13.0
- 47ed44e: deps(minor): Update package typescript-eslint from 8.13.0 to 8.14.0
- d17ced5: deps(patch): Update package vite from 5.4.10 to 5.4.11
- a5d0eda: deps(patch): Update package vitest from 2.1.4 to 2.1.5
- 216a002: deps: Updated lockfile
- e552c31: deps: Updated lockfile


</details>

## 0.3.0-next.6

### Patch Changes

- 8456d39: Test release

## 0.3.0-next.5

### Dependency Changes

<details>
<summary> Click to expand </summary>

- ee840a8: deps(minor): Update package eslint from 9.13.0 to 9.14.0
- ee840a8: deps(minor): Update package @eslint/js from 9.13.0 to 9.14.0


</details>

## 0.3.0-next.4

### Dependency Changes

<details>
<summary> Click to expand </summary>

- 578a48a: deps(minor): Update package eslint-plugin-vue from 9.29.1 to 9.30.0
- 578a48a: deps(patch): Update package @eslint/compat from 1.2.1 to 1.2.2
- 578a48a: deps(minor): Update package typescript-eslint from 8.11.0 to 8.12.2
- cbe8fe5: deps(patch): Update package vite from 5.4.9 to 5.4.10
- 578a48a: deps(patch): Update package @vue/eslint-config-typescript from 14.1.2 to 14.1.3


</details>

## 0.3.0-next.3

### Dependency Changes

<details>
<summary> Click to expand </summary>

- af7a371: deps(patch): Update package vitest from 2.1.3 to 2.1.4


</details>

## 0.3.0-next.2

### Minor Changes

- bff6357: Include vue files for web runtime packages in `tsconfig.web.json`.
  Include `sass` as dev dependency for web runtime packages.
- bff6357: Do not remove comments during TS transpilation by default. This will include JSDoc comments in the transpiled output and therefore help with documentation on the consumer side.

### Patch Changes

- bff6357: Include node types for `tsconfig.node.json` by default.
- bff6357: Ignore all `*.d.ts` files instead of files in the `@types` folder.

## 0.3.0-next.1

### Minor Changes

- 63ed43e: eslint: separate type imports (auto-fix rule)

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

- 13ca7c7: Initial Release