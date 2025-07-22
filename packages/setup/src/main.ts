#!/usr/bin/env node

import { execSync, isAdmin } from './helper'
import { setupDotConfig } from './setup-dot-config'
import { installPrograms } from './install-programs'
import { runDeveloperDSC } from './dsc'
import { installVSCodeExtensions } from './install-vscode-extensions'

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
