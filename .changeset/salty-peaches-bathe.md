---
"@desselbane/configs": major
---

Turn off vitest globals as default. With `test.extend` the `it()`/`test()` method will not always be imported from vitest so having explicit imports everywhere makes it easier to see which test context is currenly used.
