#!/usr/bin/env node

import { installPrograms } from './install-programs'
import { upgradePrograms } from './update-programs'

console.log('Bootstraping Windows, hold on to your socks')

await upgradePrograms()
await installPrograms()
