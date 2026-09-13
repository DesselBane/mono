---
'@desselbane/setup': minor
---

feat: setup steps converge instead of assuming a virgin host (ADR-002) — the dot-config step clones only when `~/.dotCfg` is absent (otherwise fetches), shows a diff and prompts before stashing a dirty work tree and force-checking-out, probes known 1Password locations for `op-ssh-sign` (failing hard when absent), and diffs/prompts before overwriting an existing `local.gitconfig` (printing the generated content on keep); the Linux step applies the same behavior to symlinks and its generated config
