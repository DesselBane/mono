import {
  buildLocalGitconfigLinux,
  needsSymlinkUpdate,
  parseLinkManifest,
  resolveOpSshSignCandidatesLinux,
} from './setup-dot-config.linux'

describe(parseLinkManifest, () => {
  it('should parse an array of home-relative paths', () => {
    const raw = JSON.stringify(['.config/starship.toml', '.gitconfig'])

    expect(parseLinkManifest(raw)).toStrictEqual([
      '.config/starship.toml',
      '.gitconfig',
    ])
  })

  it('should parse object entries mapping a Windows path to a different Linux path', () => {
    const raw = JSON.stringify([
      {
        windows: 'Documents/PowerShell/Microsoft.PowerShell_profile.ps1',
        linux: '.config/powershell/Microsoft.PowerShell_profile.ps1',
      },
    ])

    expect(parseLinkManifest(raw)).toStrictEqual([
      {
        windows: 'Documents/PowerShell/Microsoft.PowerShell_profile.ps1',
        linux: '.config/powershell/Microsoft.PowerShell_profile.ps1',
      },
    ])
  })

  it('should throw for a manifest that is not an array of link entries', () => {
    const raw = JSON.stringify({ foo: 'bar' })

    expect(() => parseLinkManifest(raw)).toThrow()
  })
})

describe(needsSymlinkUpdate, () => {
  it('should need an update when no symlink exists yet', () => {
    expect(needsSymlinkUpdate(undefined, '/mnt/c/Users/foo/bar')).toBe(true)
  })

  it('should need an update when the symlink points elsewhere', () => {
    expect(
      needsSymlinkUpdate('/mnt/c/Users/foo/old', '/mnt/c/Users/foo/bar'),
    ).toBe(true)
  })

  it('should not need an update when the symlink already points at the desired target', () => {
    expect(
      needsSymlinkUpdate('/mnt/c/Users/foo/bar', '/mnt/c/Users/foo/bar'),
    ).toBe(false)
  })
})

describe(resolveOpSshSignCandidatesLinux, () => {
  it('should list the direct 1Password install path first', () => {
    const [firstCandidate] = resolveOpSshSignCandidatesLinux('/mnt/c/Users/foo')

    expect(firstCandidate).toBe(
      '/mnt/c/Users/foo/AppData/Local/1Password/app/8/op-ssh-sign-wsl',
    )
  })

  it('should list the WindowsApps store path (with .exe extension) second', () => {
    const candidates = resolveOpSshSignCandidatesLinux('/mnt/c/Users/foo')

    expect(candidates[1]).toBe(
      '/mnt/c/Users/foo/AppData/Local/Microsoft/WindowsApps/op-ssh-sign-wsl.exe',
    )
  })
})

describe(buildLocalGitconfigLinux, () => {
  it('should include linux.gitconfig before the machine-specific ssh-sign path', () => {
    const config = buildLocalGitconfigLinux('/mnt/c/foo/op-ssh-sign-wsl')

    const includeIndex = config.indexOf('path = linux.gitconfig')
    const sshSignIndex = config.indexOf('/mnt/c/foo/op-ssh-sign-wsl')

    expect(includeIndex).toBeGreaterThanOrEqual(0)
    expect(sshSignIndex).toBeGreaterThan(includeIndex)
  })

  it('should indent every entry with a tab, matching how git config writes files', () => {
    const config = buildLocalGitconfigLinux('/mnt/c/foo/op-ssh-sign-wsl')

    const entryLines = config.split('\n').filter((line) => line.includes(' = '))

    expect(entryLines).not.toHaveLength(0)
    for (const line of entryLines) {
      expect(line).toMatch(/^\t\S/)
    }
  })

  it('should not set core.sshCommand (that belongs in the tracked linux.gitconfig)', () => {
    const config = buildLocalGitconfigLinux('/mnt/c/foo/op-ssh-sign-wsl')

    expect(config).not.toContain('sshCommand')
  })
})
