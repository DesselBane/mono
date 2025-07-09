# Setup

```powershell
sudo config --enable normal
```

```powershell
sudo winget install Volta.Volta
[Environment]::SetEnvironmentVariable("VOLTA_FEATURE_PNPM", "1", [System.EnvironmentVariableTarget]::User)
```

```powershell
volta install node@24
volta install pnpm

pnpm dlx @desselbane/setup -y
```
pnpm dlx @desselbane/setup@rc -y
