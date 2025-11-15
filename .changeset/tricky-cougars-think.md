---
'@desselbane/configs': major
---

Emitting declaration files by default and setting outDir.

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
