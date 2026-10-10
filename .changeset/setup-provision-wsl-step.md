---
'@desselbane/setup': minor
---

feat: new provision-WSL setup step — installs the Ubuntu distro, enables systemd via `/etc/wsl.conf`, installs Volta with Node and pnpm (setting `VOLTA_FEATURE_PNPM=1` inline and persisting it in `~/.profile`), and launches the setup package inside WSL
