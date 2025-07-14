---
"@repo/changelog": patch
---

Use `npm run` instead of `pnpm -w` to run the `renovate-add-changeset` command during dependency upgrades. This hopefully fixes the issue that pnpm is not available during upgrades of github-actions.
