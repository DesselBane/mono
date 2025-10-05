import path from 'node:path'
import { globSync, readFileSync, writeFileSync } from 'node:fs'
import type { Mock, Use } from 'vitest'
import { assertNotNil, workspaceRoot } from '../helper.ts'
import { run } from './reformat-changelogs.ts'

vi.mock(import('node:fs'))

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
const generatedChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'generated.example.md'),
)
const generatedDuplicatesChangelog = actualReadFileSync(
  path.join(snapshotFolder, 'generated-duplicates.example.md'),
)

const changelogPath = path.join('changelog', 'CHANGELOG.md')
const changelogFullPath = path.join(workspaceRoot, changelogPath)
const tsHelpersPath = path.join('packages', 'ts-helpers', 'CHANGELOG.md')
const tsHelpersFullPath = path.join(workspaceRoot, tsHelpersPath)
const nodeModulesPath = path.join('node_modules', 'foo', 'CHANGELOG.md')
const nodeModulesFullPath = path.join(workspaceRoot, nodeModulesPath)

describe('reformat-changelogs', () => {
  const it = test.extend<{
    globSync: Mock<typeof globSync>
    readFileSync: Mock<typeof readFileSync>
    writeFileSync: Mock<typeof writeFileSync>
  }>({
    globSync: [
      async ({}, use: Use<Mock<typeof globSync>>) => {
        const globSyncSpy = vi.mocked(globSync)
        globSyncSpy.mockReturnValue([changelogPath, tsHelpersPath])

        await use(globSyncSpy)
      },
      {
        auto: true,
      },
    ],

    readFileSync: [
      async ({}, use: Use<Mock<typeof readFileSync>>) => {
        const readFileSyncSpy = vi.mocked(readFileSync)
        readFileSyncSpy.mockReturnValue(Buffer.from(simpleChangelog))

        await use(readFileSyncSpy)
      },
      { auto: true },
    ],
    writeFileSync: [
      async ({}, use: Use<Mock<typeof writeFileSync>>) => {
        const writeFileSyncSpy = vi.mocked(writeFileSync)
        writeFileSyncSpy.mockImplementation(() => {
          //
        })
        await use(writeFileSyncSpy)
      },
      { auto: true },
    ],
  })

  it('should find all changelog files', ({ readFileSync, writeFileSync }) => {
    run()

    expect(readFileSync).toHaveBeenNthCalledWith(1, changelogFullPath)
    expect(readFileSync).toHaveBeenNthCalledWith(2, tsHelpersFullPath)

    expect(writeFileSync).toHaveBeenNthCalledWith(
      1,
      changelogFullPath,
      expect.anything(),
    )
    expect(writeFileSync).toHaveBeenNthCalledWith(
      2,
      tsHelpersFullPath,
      expect.anything(),
    )
  })

  it('should not include changelogs in node_modules', () => {
    run()

    expect(globSync).toHaveBeenCalledExactlyOnceWith(
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

  it('should extract dependency updates', async ({ writeFileSync }) => {
    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'simple.snap.md'),
    )
  })

  it('should extract dependency updates (bigger example data)', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(fullChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'full.snap.md'),
    )
  })

  it('should extract dependency updates from all update types', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(depsInAllChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'deps-in-all.snap.md'),
    )
  })

  it('should extract remove empty sections', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(removeEmptyChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'remove-unused.snap.md'),
    )
  })

  it('should not duplicate dependency section', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(noDuplicateChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'no-duplicate.snap.md'),
    )
  })

  it('should return the same value when called with formatted input', ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(fullChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1] as string
    assertNotNil(newContent)

    readFileSync.mockReturnValue(Buffer.from(newContent))
    writeFileSync.mockClear()

    run()

    const secondContent = writeFileSync.mock.lastCall?.[1]
    assertNotNil(secondContent)

    expect(secondContent).toBe(newContent)
  })

  it('should add generated dependency updates from changesets', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(generatedChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]

    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'generated.snap.md'),
    )
  })

  it('should deduplicate generated dependency updates from changesets', async ({
    readFileSync,
    writeFileSync,
  }) => {
    readFileSync.mockReturnValue(generatedDuplicatesChangelog)

    run()

    const newContent = writeFileSync.mock.lastCall?.[1]

    assertNotNil(newContent)

    await expect(newContent).toMatchFileSnapshot(
      path.join(snapshotFolder, 'generated-duplicates.snap.md'),
    )
  })
})
