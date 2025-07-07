#!/usr/bin/env node

import { execSync } from 'node:child_process'

execSync('pnpm -w changeset version', { stdio: 'inherit' })
execSync('pnpm -w reformat-changelogs', { stdio: 'inherit' })
