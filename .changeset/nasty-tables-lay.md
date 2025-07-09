---
"@desselbane/configs": minor
---

Add support for `tsdown`.

This is a basic [`tsdown`](https://tsdown.dev/) config which by default targets esm and the `neutral` platform.

Place a `tsdown.config.ts` file next to your `package.json` with the following content:

```typescript
import { defineConfig } from 'tsdown'
import { libConfig } from './src/tsdown.config.tpl.ts'

export default defineConfig({
  ...libConfig,
})
```
