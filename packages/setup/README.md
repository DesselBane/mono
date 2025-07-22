# Setup

Manual Steps:

- Install [FiraCode Font](https://github.com/tonsky/FiraCode/wiki/Installing)

Run in Admin Powershell:

```powershell
sudo config --enable normal
```

```powershell
winget update Microsoft.AppInstaller
winget configure --enable

sudo winget install Volta.Volta
[Environment]::SetEnvironmentVariable("VOLTA_FEATURE_PNPM", "1", [System.EnvironmentVariableTarget]::User)
volta install node@24
volta install pnpm

pnpm dlx @desselbane/setup -y
```

After the script you might want to

- Restore PowerToys Settings
