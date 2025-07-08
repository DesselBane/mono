#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { simpleGit } from 'simple-git'

const git = simpleGit()

execSync('pnpm -w changeset version', { stdio: 'inherit' })
execSync('pnpm -w reformat-changelogs', { stdio: 'inherit' })
const status = await git.status()
const diff = await git.diff(['packages/scripts/src/renovate-add-changeset.ts'])

console.log(JSON.stringify(diff, undefined, 2))
console.log(JSON.stringify(status, undefined, 2))
