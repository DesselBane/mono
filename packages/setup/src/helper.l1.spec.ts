import { noop, it, baseTest } from '@desselbane/vitest-helpers'
import { safeTry } from '@desselbane/ts-helpers'
import type { MockInstance } from 'vitest'
import {
  execSync as execSyncHelper,
  cleanExit,
  contentDiffers,
  existsIncludingAppAliases,
  findExistingPath,
  isAdmin,
  wingetInstall,
} from './helper'

vi.mock(import('node:child_process'))

describe(isAdmin, () => {
  const it = baseTest.extend<{
    platformSpy: MockInstance<() => NodeJS.Platform>
    _autoSetup: unknown
  }>({
    _autoSetup: [
      async ({ execSyncSpy: _ }, use) => {
        await use('')
      },
      { auto: true },
    ],
    platformSpy: [
      async ({}, use) => {
        const platformSpy = vi.spyOn(process, 'platform', 'get')
        platformSpy.mockReturnValue('win32')
        await use(platformSpy)
        platformSpy.mockRestore()
      },
      { auto: true },
    ],
  })

  it('should return false for non win32 plattform', ({ platformSpy }) => {
    platformSpy.mockReturnValue('darwin')

    expect(isAdmin()).toBe(false)
  })

  it('should return false if fsutil command throws', ({ execSyncSpy }) => {
    execSyncSpy.mockImplementation(() => {
      throw new Error('Test')
    })

    expect(isAdmin()).toBe(false)
  })

  it('should return true if fsutil command does not throw', ({
    execSyncSpy,
  }) => {
    execSyncSpy.mockImplementation(noop)

    expect(isAdmin()).toBe(true)
  })
})

describe(cleanExit, () => {
  const it = baseTest.extend({
    _autoSetup: [
      async ({ processExitSpy: _, consoleLogSpy: __ }, use) => {
        await use('')
      },
      { auto: true },
    ],
  })

  it('should log before exiting', ({ consoleLogSpy }) => {
    cleanExit()

    expect(consoleLogSpy).toHaveBeenCalledExactlyOnceWith(expect.any(String))
  })

  it('should exit with code 0', ({ processExitSpy }) => {
    cleanExit()

    expect(processExitSpy).toHaveBeenCalledExactlyOnceWith(0)
  })

  it('should not exit on non error safeReturn', ({ processExitSpy }) => {
    const safeReturn = safeTry(() => '')

    cleanExit(safeReturn)

    expect(processExitSpy).not.toHaveBeenCalled()
  })

  it('should exit on error safeReturn', ({ processExitSpy }) => {
    const safeReturn = safeTry(() => {
      throw new Error('test')
    })

    cleanExit(safeReturn)

    expect(processExitSpy).toHaveBeenCalledExactlyOnceWith(0)
  })
})

describe(execSyncHelper, () => {
  it('should call nodes execSync with the correct options', ({
    execSyncSpy,
  }) => {
    execSyncHelper('foo')

    expect(execSyncSpy).toHaveBeenCalledExactlyOnceWith('foo', {
      stdio: 'inherit',
    })
  })
})

describe(wingetInstall, () => {
  it('should include the passed package name', ({ execSyncSpy }) => {
    wingetInstall('myPackage')

    expect(execSyncSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('myPackage'),
      expect.anything(),
    )
  })

  it('should accept package and source agreements', ({ execSyncSpy }) => {
    wingetInstall('myPackage')

    expect(execSyncSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('--accept-package-agreements'),
      expect.anything(),
    )
    expect(execSyncSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('--accept-source-agreements'),
      expect.anything(),
    )
  })

  it('should ignore any error thrown by execSync', ({ execSyncSpy }) => {
    execSyncSpy.mockImplementation(() => {
      throw new Error('Test')
    })

    expect(() => {
      wingetInstall('foo')
    }).not.toThrow()
  })
})

function existsOnlyB(candidate: string) {
  return candidate === 'b'
}

function existsNever() {
  return false
}

describe(findExistingPath, () => {
  it('should return the first candidate that exists', () => {
    expect(findExistingPath(['a', 'b', 'c'], existsOnlyB)).toBe('b')
  })

  it('should return undefined when no candidate exists', () => {
    expect(findExistingPath(['a', 'b'], existsNever)).toBeUndefined()
  })
})

function lstatSucceeding() {
  return {}
}

/**
Simulates lstat on a Windows app-execution alias, where lstat succeeds but stat throws EACCES.
*/
function lstatOnAppAlias() {
  return { isSymbolicLink: () => true }
}

function lstatThrowing(): unknown {
  throw new Error('ENOENT')
}

describe(existsIncludingAppAliases, () => {
  it('should report existing when lstat succeeds', () => {
    expect(
      existsIncludingAppAliases('C:/foo/op-ssh-sign.exe', lstatSucceeding),
    ).toBe(true)
  })

  it('should report existing for an app-execution alias (stat-based existsSync would fail)', () => {
    expect(
      existsIncludingAppAliases(
        'C:/Users/foo/AppData/Local/Microsoft/WindowsApps/op-ssh-sign.exe',
        lstatOnAppAlias,
      ),
    ).toBe(true)
  })

  it('should report missing when lstat throws', () => {
    expect(existsIncludingAppAliases('C:/missing', lstatThrowing)).toBe(false)
  })
})

describe(contentDiffers, () => {
  it('should report differing when the existing content is undefined', () => {
    expect(contentDiffers(undefined, 'generated')).toBe(true)
  })

  it('should report differing when the contents do not match', () => {
    expect(contentDiffers('current', 'generated')).toBe(true)
  })

  it('should report not differing when the contents match', () => {
    expect(contentDiffers('same', 'same')).toBe(false)
  })
})
