---
"@repo/scripts": patch
---

Fix renovate-add-changeset. Exit script if a package.json is found without a name. This happens for the turbo package and generally means it is not a package of the workspace so we can ignore it.
