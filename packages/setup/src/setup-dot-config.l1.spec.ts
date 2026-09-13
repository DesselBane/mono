import {
  buildLocalGitconfigWindows,
  isDotCfgDirty,
  resolveOpSshSignCandidatesWindows,
} from './setup-dot-config'

describe(resolveOpSshSignCandidatesWindows, () => {
  it('should list the direct 1Password install path first', () => {
    const [firstCandidate] = resolveOpSshSignCandidatesWindows(
      'C:/Users/foo/AppData/Local',
    )

    expect(firstCandidate).toBe(
      'C:/Users/foo/AppData/Local/1Password/app/8/op-ssh-sign.exe',
    )
  })

  it('should list the WindowsApps store path second', () => {
    const candidates = resolveOpSshSignCandidatesWindows(
      'C:/Users/foo/AppData/Local',
    )

    expect(candidates[1]).toBe(
      'C:/Users/foo/AppData/Local/Microsoft/WindowsApps/op-ssh-sign.exe',
    )
  })
})

describe(isDotCfgDirty, () => {
  it('should be dirty when porcelain output has entries', () => {
    expect(isDotCfgDirty(' M .gitconfig\n')).toBe(true)
  })

  it('should not be dirty when porcelain output is empty', () => {
    expect(isDotCfgDirty('')).toBe(false)
  })

  it('should not be dirty when porcelain output is only whitespace', () => {
    expect(isDotCfgDirty('   \n')).toBe(false)
  })
})

describe(buildLocalGitconfigWindows, () => {
  it('should include windows.gitconfig before the machine-specific values', () => {
    const config = buildLocalGitconfigWindows('C:/foo/op-ssh-sign.exe')

    const includeIndex = config.indexOf('path = windows.gitconfig')
    const gpgIndex = config.indexOf('C:/foo/op-ssh-sign.exe')

    expect(includeIndex).toBeGreaterThanOrEqual(0)
    expect(gpgIndex).toBeGreaterThan(includeIndex)
  })

  it('should indent every entry with a tab, matching how git config writes files', () => {
    const config = buildLocalGitconfigWindows('C:/foo/op-ssh-sign.exe')

    const entryLines = config.split('\n').filter((line) => line.includes(' = '))

    expect(entryLines).not.toHaveLength(0)
    for (const line of entryLines) {
      expect(line).toMatch(/^\t\S/)
    }
  })

  it('should keep the sshCommand pointing at the Windows OpenSSH client', () => {
    const config = buildLocalGitconfigWindows('C:/foo/op-ssh-sign.exe')

    expect(config).toContain('sshCommand = C:/Windows/System32/OpenSSH/ssh.exe')
  })
})
