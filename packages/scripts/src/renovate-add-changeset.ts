#!/usr/bin/env node

/* eslint-disable unicorn/no-keyword-prefix */

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'
import type { PackageJson } from 'type-fest'
import { assertNotNil } from './helper.ts'

const workspaceRoot = path.join(import.meta.dirname, '..', '..', '..')
const changesetFolder = path.join(workspaceRoot, '.changeset')

function makeStringSafe(value: string): string {
  return value.replaceAll('/', '_').replaceAll('@', '_').replaceAll('.', '_')
}

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
    isLockfileUpdate: {
      type: 'string',
    },
    packageFile: {
      type: 'string',
    },
    manager: {
      type: 'string',
    },
    updateType: {
      type: 'string',
    },
  },
})

const {
  currentVersion,
  newVersion,
  depName,
  depType,
  isLockfileUpdate,
  packageFile,
  manager,
  updateType,
} = values

assertNotNil(packageFile)
assertNotNil(currentVersion)
assertNotNil(depName)
assertNotNil(depType)
assertNotNil(isLockfileUpdate)
assertNotNil(newVersion)
assertNotNil(manager)

function getPackageName(packageFile: string) {
  if (manager === 'github-actions') {
    return '@repo/changelog'
  }

  const packageJson = JSON.parse(
    readFileSync(path.join(workspaceRoot, packageFile)).toString(),
  ) as PackageJson

  const temporaryPackageName = packageJson.name
  assertNotNil(temporaryPackageName)

  return temporaryPackageName === '@repo/root'
    ? '@repo/changelog'
    : temporaryPackageName
}

const packageName = getPackageName(packageFile)
const packageNameSafe = makeStringSafe(packageName)

if (isLockfileUpdate != '') {
  const content = `---
'${packageName}': patch
---

deps: Updated lockfile
`

  writeFileSync(
    path.join(
      changesetFolder,
      `|deps_${packageNameSafe}-lockFileUpdate-${Date.now()}.md`,
    ),
    content,
  )

  process.exit(0)
}

const content = `---
'${packageName}': patch
---

deps: [${updateType}|${depType}] Update package ${depName} from ${currentVersion} to ${newVersion}
`

writeFileSync(
  path.join(
    changesetFolder,
    `zz-deps-${packageNameSafe}-${makeStringSafe(depName)}-${makeStringSafe(currentVersion)}-${makeStringSafe(newVersion)}.md`,
  ),
  content,
)
