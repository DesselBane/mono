---
'@desselbane/ts-helpers': minor
---

Enhance `safeTry`/`safeTryAsync`. Add an object variant to the return type.

Now you can also access the values like this:

```typescript
const { error, data } = safeTry(() => myBadFunction())
const { error, data } = await safeTryAsync(() => myBadPromise())
```
