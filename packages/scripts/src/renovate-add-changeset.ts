#!/usr/bin/env node

/* eslint-disable unicorn/no-keyword-prefix */

import { randomUUID } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'

const { values } = parseArgs({
  allowNegative: false,
  allowPositionals: false,
  strict: true,
  options: {
    currentVersion: {
      type: 'string',
    },
    newVersion: {
      type: 'string',
    },
    depName: {
      type: 'string',
    },
    depType: {
      type: 'string',
    },
    displayFrom: {
      type: 'string',
    },
    isLockfileUpdate: {
      type: 'string',
    },
    packageFile: {
      type: 'string',
    },
    packageFileDir: {
      type: 'string',
    },
    packageName: {
      type: 'string',
    },
    prettyDepType: {
      type: 'string',
    },
    project: {
      type: 'string',
    },
    references: {
      type: 'string',
    },
    releases: {
      type: 'string',
    },
    releaseNotes: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    version: {
      type: 'string',
    },
    versioning: {
      type: 'string',
    },
  },
})

const workspaceRoot = path.join(import.meta.dirname, '..', '..', '..')

writeFileSync(
  path.join(workspaceRoot, '.changeset', `${randomUUID()}.md`),
  JSON.stringify(values, undefined, 2),
)
