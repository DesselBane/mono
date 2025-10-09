# @desselbane/configs

This package contains the opinionated configs of Dessel Bane.

# Development and Contributions

Please see the [general readme](../../README.md#development-and-contributions)

# Package configurations

## Eslint

Place an `eslint.config.ts` file next to your `package.json` with the following content:

```javascript
import path from 'node:path'
import { createEslintConfig } from '@desselbane/configs/eslint'

export default createEslintConfig({
  packageDir: import.meta.dirname,
  workspaceDir: path.join(import.meta.dirname, '..', '..'),
})
```

For more info on what you can pass as options to the `createEslintConfig` function consult the type docs.

Additionally it is advised to turn off certain rules on save as they slow down eslint considerably. The following settings are recommended for vs code:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "eslint.run": "onSave",
  "eslint.useFlatConfig": true,
  "eslint.validate": [
    "typescript",
    "javascript",
    "javascriptreact",
    "vue",
    "vue-html",
    "html",
    "markdown",
    "mdx"
  ],
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "eslint.codeActionsOnSave.mode": "problems",
  "eslint.lintTask.options": ". --cache",
  "eslint.options": {
    "overrideConfig": {
      "rules": {
        "prefer-const": "off",
        "import-x/no-cycle": "off",
        "import-x/no-deprecated": "off",
        "import-x/no-named-as-default": "off",
        "import-x/no-unused-modules": "off",
      }
    }
  }
}
```

## Prettier

Place a `prettier.config.js` next to your `package.json` with the following content:

```javascript
export { default } from '@desselbane/configs/prettier'
```

## Typescript

This package exports 4 `tsconfig.x.tpl.json` files for different use cases:

- `tsconfig.neutral.tpl.json`: This is the root tsconfig which contains all settings and can be used with any vanilla TS project. Use this if you build a lib which might be used in the browser as well as in a Node environment.
- `tsconfig.bundler-web.tpl.json`: This config extends `tsconfig.neutral.tpl.json` and adds the libs `ESNext` and `DOM`. It is meant to be used for browser based projects like a vue frontend which is bundled before it is executed (with something like vite).
- `tsconfig.bundler-node.tpl.json`: This config extends `tsconfig.neutral.tpl.json` and adds `ESNext` as lib as well as the types for `node`. Use this if you have a project which will run in node later on but is bundled before it is executed (with something like tsup)
- `tsconfig.node.tpl.json`: This config extends `tsconfig.neutral.tpl.json`. It changes the module system and resolution to `NodeNext`, adds `ESNext` as lib and adds the types for `node`. Use this for anything which will be executed by node directly without a bundling step in between. Typically, it is used for config files.

In general, it is recommended to split the project into multiple tsconfig files, each for its own purpose, and reference them in the `tsconfig.json`. Example:

Use a `tsconfig.app.json` for your app files:

```json
{
  "include": ["src/**/*.ts", "@types", "**/*.vue"],
  "exclude": ["src/**/*.spec.ts", "**/__mocks__/**/*", "**/*.spec-d.ts"],
  "extends": "@desselbane/configs/tsconfig.bundler-web.tpl.json"
}
```

This includes all app files but excludes test files as they have vitest specifics available which the app does not.

Use a `tsconfig.vitest.json` for your test files:

```json
{
  "extends": "@desselbane/configs/tsconfig.bundler-web.tpl.json",
  "include": ["src/**/*", "@types"],
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

Use a `tsconfig.configs.json` for your config files:

```json
{
  "extends": "@desselbane/configs/tsconfig.node.tpl.json",
  "include": ["*.config.ts"],
  "compilerOptions": {
    "declaration": false
  }
}
```

And then reference all of them in one single `tsconfig.json` file:

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.configs.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
```

## Vitest

This config includes:

- Opinionated `vitest` options
- setup of `jest-extended` matchers
- automocking of `vue-i18n`s `t` function
- the [`vue3-snapshot-serializer`](https://thejaredwilcurt.com/vue-snapshot-serializer)

### Standalone Config

Create a `vitest.config.ts` file next to your `package.json` with the following content:

```typescript
export { default } from '@desselbane/configs/vitest'
```

### With a vite.config.ts

You can still create a `vitest.config.ts` or you could modify your `vite.config.ts` like so:

```typescript
import vue from '@vitejs/plugin-vue'
import { default as vitestDefaultConfig } from '@desselbane/configs/vitest'
import { defineConfig, mergeConfig } from 'vite'

export default mergeConfig(
  vitestDefaultConfig,
  defineConfig({
    // ... your vite config goes here
    plugins: [vue()],
  }),
)
```

### Get the jest-extended types

In the `tsconfig.vitest.json` add `"@desselbane/configs/vitest-shims.d.ts"` to the `compilerOptions.types` property. It should look similar to this:

```json
{
  "extends": "@desselbane/configs/tsconfig.bundler-web.tpl.json",
  "include": ["src/**/*", "@types"],
  "compilerOptions": {
    "types": ["vitest/globals", "@desselbane/configs/vitest-shims.d.ts"]
  }
}
```

### Disable the `vue3-snapshot-serializer`

```typescript
import { createVitestConfig } from '@desselbane/configs/vitest'

export default createVitestConfig({ useVue3SnapshotSerializer: false })
```

### FAQ

> My tests sometimes fail in the pipeline, but I can not reproduce the failures locally. Why?

This config automatically shuffles your tests. Most likely your tests only work if they are run in a certain order, or they fail if they are run in a certain order. To debug this use the shuffle seed form the CI run to reproduce the test order. See read up on the config options [`sequence.shuffle`](https://vitest.dev/config/#sequence-shuffle) and [`sequence.seed`](https://vitest.dev/config/#sequence-seed) in vitests docs.

## Vite (coming soon)

## Tsdown

This is a basic [`tsdown`](https://tsdown.dev/) config which by default targets esm and the `neutral` platform.

Place a `tsdown.config.ts` file next to your `package.json` with the following content:

```typescript
import { defineConfig } from 'tsdown'
import { libConfig } from './src/tsdown.config.tpl.ts'

export default defineConfig({
  ...libConfig,
})
```
