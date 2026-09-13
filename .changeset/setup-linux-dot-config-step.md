---
'@desselbane/setup': minor
---

feat: Linux/WSL dot-config support — platform dispatch in the CLI entry point, symlinks into the Windows checkout driven by the tracked `wsl-links.json` link manifest (incl. `{windows, linux}` mapped entries), a generated Linux `local.gitconfig` with the OS include chain, and pwsh as login shell
