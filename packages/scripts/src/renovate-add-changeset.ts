#!/usr/bin/env node

/* eslint-disable unicorn/no-keyword-prefix */

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

console.log(JSON.stringify(values, undefined, 2))
