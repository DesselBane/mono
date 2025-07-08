---
"@repo/scripts": patch
---

Fix renovate-add-changeset. Return `@repo/changelog` if the packageFile is not a JSON file. This happens when the lockfile for the workspace is updated as the packageFile will be pnpm-workspace.yaml
