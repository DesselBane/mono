import path from 'node:path'
import { assertNotNil, workspaceRoot } from '../helper.ts'
import { run } from './reformat-changelogs.ts'

const { globSync, readFileSync, writeFileSync } = vi.hoisted(() => ({
  globSync: vi.fn<() => string[]>(() => {
    throw new Error('Mock globSync not initialized')
  }),
  readFileSync: vi.fn<(path: string) => Buffer>(() => {
    throw new Error('Mock readFileSync not initialized')
  }),
  writeFileSync: vi.fn<(path: string, content: string) => void>(),
}))

vi.mock('node:fs', () => ({
  globSync,
  readFileSync,
  writeFileSync,
}))

const { readFileSync: actualReadFileSync } = (await vi.importActual(
  'node:fs',
)) as any

const snapshotFolder = path.join(import.meta.dirname, '__snapshots__')
const simpleChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'simple.example.md'),
)
const fullChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'full.example.md'),
)
const depsInAllChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'deps-in-all.example.md'),
)
const removeEmptyChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'remove-empty.example.md'),
)
const noDuplicateChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'no-duplicate.example.md'),
)

const changelogPath = path.join('changelog', 'CHANGELOG.md')
const changelogFullPath = path.join(workspaceRoot, changelogPath)
const tsHelpersPath = path.join('packages', 'ts-helpers', 'CHANGELOG.md')
const tsHelpersFullPath = path.join(workspaceRoot, tsHelpersPath)
const nodeModulesPath = path.join('node_modules', 'foo', 'CHANGELOG.md')
const nodeModulesFullPath = path.join(workspaceRoot, nodeModulesPath)

describe('reformat-changelogs', () => {
  beforeEach(() => {
    globSync.mockReturnValue([changelogPath, tsHelpersPath])

    readFileSync.mockReturnValue(Buffer.from(simpleChangelog))
  })

  it('should find all changelog files', () => {
    run()

    expect(readFileSync).toHaveBeenCalledWith(changelogFullPath)
    expect(readFileSync).toHaveBeenCalledWith(tsHelpersFullPath)

    expect(writeFileSync).toHaveBeenCalledWith(
      changelogFullPath,
      expect.anything(),
    )
    expect(writeFileSync).toHaveBeenCalledWith(
      changelogFullPath,
      expect.anything(),
    )
  })

  it('should not include changelogs in node_modules', () => {
    run()

    expect(globSync).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        exclude: expect.toIncludeSameMembers([
          '**/node_modules',
          '**/dist',
          '**/.turbo',
        ]),
      }),
    )
    expect(readFileSync).not.toHaveBeenCalledWith(nodeModulesFullPath)
    expect(writeFileSync).not.toHaveBeenCalledWith(
      nodeModulesFullPath,
      expect.anything(),
    )
  })

  it('should extract dependency updates', async () => {
    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'simple.snap.md'),
    )
  })

  it('should extract dependency updates (bigger example data)', async () => {
    readFileSync.mockReturnValue(fullChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'full.snap.md'),
    )
  })

  it('should extract dependency updates from all update types', async () => {
    readFileSync.mockReturnValue(depsInAllChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'deps-in-all.snap.md'),
    )
  })

  it('should extract remove empty sections', async () => {
    readFileSync.mockReturnValue(removeEmptyChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'remove-unused.snap.md'),
    )
  })

  it('should not duplicate dependency section', async () => {
    readFileSync.mockReturnValue(noDuplicateChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'no-duplicate.snap.md'),
    )
  })

  it('should return the same value when called with formatted input', () => {
    readFileSync.mockReturnValue(fullChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    readFileSync.mockReturnValue(Buffer.from(newContent))
    writeFileSync.mockClear()

    run()

    const secondContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(secondContent)

    expect(secondContent).toBe(newContent)
  })
})
