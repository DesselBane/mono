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

## WSL

The Windows run offers an optional "provision WSL" step.
It installs an Ubuntu distro if none is present yet.
It enables systemd via `/etc/wsl.conf`.
It installs Volta and Node inside the distro.
It then launches the setup package inside WSL.

To bootstrap an existing WSL distro directly, run this one-liner inside it.

```bash
curl https://get.volta.sh | bash && volta install node && npx --yes @desselbane/setup
```

The Linux run sets up the dot-config symlinks, pointing into the Windows checkout (see [ADR-001](./doc/adr/ADR-001-windows-dotcfg-checkout-as-single-source-of-truth.md)).
It generates `local.gitconfig`, sets `pwsh` as the login shell, and installs programs via `apt`.
