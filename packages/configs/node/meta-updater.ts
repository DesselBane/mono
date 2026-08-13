import { existsSync } from 'node:fs'
import { glob, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { format, resolveConfig } from 'prettier'

const PACKAGE_JSON_UPDATES = {
  type: 'module',
  author: 'Dessel Bane',
  devEngines: {
    packageManager: {
      name: 'pnpm',
      version: '11.21.0',
    },
    runtime: {
      name: 'node',
      version: '24.19.0',
    },
  },
  volta: {
    node: '24.19.0',
    pnpm: '11.21.0',
  },
}

const packageDir = path.join(import.meta.dirname, '..')

let repoRoot = packageDir
while (!existsSync(path.join(repoRoot, '.git'))) {
  const newRoot = path.join(repoRoot, '..')

  if (newRoot === repoRoot) {
    throw new Error('Could not find repo root')
  }

  repoRoot = newRoot
}

const globResult = glob('**/package.json', {
  cwd: repoRoot,
})
for await (const entry of globResult) {
  const fullEntry = path.join(repoRoot, entry)
  const packageJsonText = await readFile(fullEntry, 'utf8')
  const packageJsonParsed: unknown = JSON.parse(packageJsonText)

  if (typeof packageJsonParsed !== 'object' || packageJsonParsed == undefined) {
    throw new Error(`Invalid package.json found at ${entry}`)
  }

  const updatedPackageJson = {
    ...packageJsonParsed,
    ...PACKAGE_JSON_UPDATES,
  }
  const updatedPackageJsonText = JSON.stringify(updatedPackageJson)

  const prettierOptions =
    (await resolveConfig(fullEntry, {
      editorconfig: true,
    })) ?? {}
  const updatedPackageJsonTextFormatted = await format(updatedPackageJsonText, {
    ...prettierOptions,
    filepath: fullEntry,
  })

  await writeFile(fullEntry, updatedPackageJsonTextFormatted, 'utf8')
}
