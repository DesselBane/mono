import { globSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { assertNotNil, workspaceRoot } from '../helper.ts'

type LineTypes =
  | 'package name'
  | 'version number'
  | 'major changes section'
  | 'minor changes section'
  | 'patch changes section'
  | 'dependency changes section'
  | 'changeset start'
  | 'dependency update'
  | 'changeset generated dependency update'
  | 'unknown'

function determineLineType(line: string): LineTypes {
  if (line.startsWith('- Updated dependencies')) {
    return 'changeset generated dependency update'
  }

  if (
    line.includes('deps: ') ||
    line.includes('deps(patch): ') ||
    line.includes('deps(minor): ') ||
    line.includes('deps(major): ') ||
    line.includes('deps(peer): ')
  ) {
    return 'dependency update'
  }

  if (line.startsWith('# ')) {
    return 'package name'
  }
  if (line.startsWith('## ')) {
    return 'version number'
  }
  if (line.startsWith('### Major Changes')) {
    return 'major changes section'
  }
  if (line.startsWith('### Minor Changes')) {
    return 'minor changes section'
  }
  if (line.startsWith('### Patch Changes')) {
    return 'patch changes section'
  }
  if (
    line.startsWith('### Dependency Changes') ||
    line.includes('<details>') ||
    line.includes('</details>') ||
    line.includes('<summary> Click to expand </summary>')
  ) {
    return 'dependency changes section'
  }
  if (line.startsWith('- ')) {
    return 'changeset start'
  }
  return 'unknown'
}

type VersionContent = {
  majorChanges: string[]
  minorChanges: string[]
  patchChanges: string[]
  dependencyUpdates: string[]
  version: string
}

type ChangelogContents = {
  packageName: string
  versions: VersionContent[]
}

function parseFile(lines: string[]): ChangelogContents {
  let currentLine = lines.shift()
  let changelogContents: ChangelogContents | undefined

  while (changelogContents == undefined) {
    assertNotNil(currentLine, 'Expected "currentLine" not to be nil.')

    const type = determineLineType(currentLine)

    switch (type) {
      case 'package name': {
        changelogContents = {
          packageName: currentLine,
          versions: [],
        }
        break
      }
      case 'unknown': {
        currentLine = lines.shift()
        break
      }
      default: {
        throw new Error('Expected package name')
      }
    }
  }

  while (lines.length > 0) {
    const version = parseVersion(lines)
    if (version != undefined) {
      changelogContents.versions.push(version)
    }
  }

  return changelogContents
}

function parseVersion(lines: string[]): VersionContent | undefined {
  let currentLine = lines.shift()
  let currentChangeActive = false
  const generatedDependencyUpdateCache = new Set<string>()
  let currentSection:
    | 'major changes section'
    | 'minor changes section'
    | 'patch changes section'
    | undefined = undefined

  const version: VersionContent = {
    dependencyUpdates: [],
    majorChanges: [],
    minorChanges: [],
    patchChanges: [],
    version: '',
  }

  function addToChange() {
    assertNotNil(currentSection, 'Current Section may not be null', {
      currentLine,
      currentSection,
      lines,
      version,
    })
    assertNotNil(currentLine)

    switch (currentSection) {
      case 'major changes section': {
        version.majorChanges.push(currentLine)
        break
      }
      case 'minor changes section': {
        version.minorChanges.push(currentLine)
        break
      }
      case 'patch changes section': {
        version.patchChanges.push(currentLine)
        break
      }
    }
  }

  while (true) {
    if (currentLine == undefined) {
      return
    }

    const type = determineLineType(currentLine)
    if (type === 'version number') {
      version.version = currentLine
      currentLine = lines.shift()
      break
    }

    if (type !== 'unknown') {
      throw new Error('Unexpected line type')
    }
    currentLine = lines.shift()
  }

  while (true) {
    if (currentLine == undefined) {
      return version
    }
    const type = determineLineType(currentLine)

    switch (type) {
      case 'package name': {
        throw new Error('There should not be another package name')
      }
      case 'version number': {
        lines.unshift(currentLine)
        return version
      }
      case 'major changes section':
      case 'minor changes section':
      case 'patch changes section': {
        currentChangeActive = false
        currentSection = type
        break
      }
      case 'dependency changes section': {
        currentChangeActive = false
        break
      }
      case 'dependency update': {
        currentChangeActive = false
        version.dependencyUpdates.push(currentLine)
        break
      }
      case 'changeset start': {
        currentChangeActive = true
        addToChange()
        break
      }
      case 'unknown': {
        if (currentChangeActive) {
          addToChange()
        }
        break
      }

      case 'changeset generated dependency update': {
        if (!generatedDependencyUpdateCache.has(currentLine)) {
          version.dependencyUpdates.push(currentLine)
          generatedDependencyUpdateCache.add(currentLine)
        }

        while (true) {
          currentLine = lines.shift()

          if (currentLine == undefined) {
            break
          }

          if (currentLine.startsWith('  - ')) {
            version.dependencyUpdates.push(currentLine)
          } else {
            lines.unshift(currentLine)
            break
          }
        }

        break
      }
    }

    currentLine = lines.shift()
  }
}

function formatChangelog(pathToChangelog: string) {
  console.log(`Formatting Changelog at: ${pathToChangelog}`)

  const fileContents = readFileSync(pathToChangelog).toString().split('\n')

  const formattedFile: string[] = []

  const changelogContents = parseFile(fileContents)
  formattedFile.push(changelogContents.packageName)

  for (const version of changelogContents.versions) {
    if (version.majorChanges.at(-1) == '') {
      version.majorChanges.pop()
    }
    if (version.minorChanges.at(-1) == '') {
      version.minorChanges.pop()
    }
    if (version.patchChanges.at(-1) == '') {
      version.patchChanges.pop()
    }

    formattedFile.push('', version.version)

    if (version.majorChanges.length > 0) {
      formattedFile.push('', '### Major Changes', '', ...version.majorChanges)
    }
    if (version.minorChanges.length > 0) {
      formattedFile.push('', '### Minor Changes', '', ...version.minorChanges)
    }
    if (version.patchChanges.length > 0) {
      formattedFile.push('', '### Patch Changes', '', ...version.patchChanges)
    }

    if (version.dependencyUpdates.length > 0) {
      formattedFile.push('', '### Dependency Changes')
      formattedFile.push(
        '',
        '<details>',
        '<summary> Click to expand </summary>',
      )
      formattedFile.push('', ...version.dependencyUpdates, '')
      formattedFile.push('', '</details>')
    }
  }

  writeFileSync(pathToChangelog, formattedFile.join('\n'))
}

export function run() {
  const changelogFiles = globSync('**/CHANGELOG.md', {
    cwd: workspaceRoot,
    exclude: ['**/node_modules', '**/dist', '**/.turbo'],
  })

  for (const changelog of changelogFiles) {
    formatChangelog(path.join(workspaceRoot, changelog))
  }
}
