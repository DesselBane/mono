---
"@desselbane/configs": major
---

Move to incremental and composite build by default.

If you want to opt out of this change set

```json
{
  "compilerOptions": {
    "incremental": false,
    "composite": false
  }
}
```
