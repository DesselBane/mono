#!/usr/bin/env node

import { execSync, isAdmin } from './helper'
import { setupDotConfigLinux } from './setup-dot-config.linux'
import { installPrograms } from './install-programs'
import { runDeveloperDSC } from './dsc'
import { provisionWsl } from './provision-wsl'

if (process.platform === 'win32') {
  /*
  Windows-only modules assert Windows env vars (USERPROFILE, LOCALAPPDATA) at module top level,
  so they must not be imported statically — that would crash on Linux before the platform check.
  */
  const { setupDotConfig } = await import('./setup-dot-config')
  const { installVSCodeExtensions } =
    await import('./install-vscode-extensions')

  console.log('🧙 Checking admin 🧙‍♂️')

  if (!isAdmin()) {
    console.log('elevating... 🧙 => 🧙‍♂️')
    execSync(`sudo ${process.argv.join(' ')}`)
    process.exit(0)
  }

  console.log('Bootstraping Windows, hold on to your socks')

  await setupDotConfig()
  await installPrograms()
  await installVSCodeExtensions()
  await runDeveloperDSC()
  await provisionWsl()
} else {
  console.log('Bootstraping Linux, hold on to your socks')

  await setupDotConfigLinux()
  await installPrograms()
}
