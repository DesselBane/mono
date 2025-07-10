#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { isAdmin } from './helper'
import { upgradePrograms } from './update-programs'
import { setupDotConfig } from './setup-dot-config'
import { installPrograms } from './install-programs'

console.log('🧙 Checking admin 🧙‍♂️')

if (isAdmin()) {
  console.log('isAdmin: true 🧙‍♂️')
  console.log('continueing...')
} else {
  console.log('isAdmin: false 🧙')
  console.log('elevating... 🧙 => 🧙‍♂️')
  execSync(`sudo ${process.argv.join(' ')}`, { stdio: 'inherit' })
  process.exit(0)
}

console.log('Bootstraping Windows, hold on to your socks')

await upgradePrograms()
await setupDotConfig()
await installPrograms()
