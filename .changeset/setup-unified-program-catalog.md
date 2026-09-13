---
'@desselbane/setup': minor
---

feat: unified cross-platform program catalog — `program.config.json` entries now carry `WingetId`/`AptId`/`aptPrereq`/`linuxInstall`, and the install step installs via winget on Windows and apt (with prereq handling and custom install commands) on Linux
