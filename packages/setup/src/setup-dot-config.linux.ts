import path from 'node:path'
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { assertNotNil, safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import { z } from 'zod'
import {
  cleanExit,
  contentDiffers,
  execSync,
  execSyncCapture,
  findExistingPath,
} from './helper'

function getHome() {
  assertNotNil(process.env.HOME)

  return process.env.HOME
}

const linkManifestSchema = z.array(
  z.union([z.string(), z.object({ windows: z.string(), linux: z.string() })]),
)

export type LinkManifestEntry = z.infer<typeof linkManifestSchema>[number]

/**
Resolves the Windows home directory as a WSL path (e.g. `/mnt/c/Users/foo`).
*/
export function resolveWindowsHome() {
  return execSyncCapture(`wslpath "$(cmd.exe /c 'echo %USERPROFILE%')"`)
}

/**
Parses the `wsl-links.json` link manifest into home-relative link entries.
A string entry uses the same path on both sides; an object entry maps a Windows source path to a different Linux link path.
*/
export function parseLinkManifest(raw: string) {
  return linkManifestSchema.parse(JSON.parse(raw))
}

/**
Whether the symlink at {@link currentLinkTarget} (`undefined` if it doesn't exist as a symlink)
needs to be (re)created to point at {@link desiredTarget}.
*/
export function needsSymlinkUpdate(
  currentLinkTarget: string | undefined,
  desiredTarget: string,
) {
  return currentLinkTarget !== desiredTarget
}

/**
Creates symlinks in the WSL home for every entry of {@link entries}, pointing into {@link winHome}.
Converges with any existing path: leaves already-correct symlinks alone, and prompts before
replacing an existing file or a symlink pointing elsewhere.
*/
export async function createSymlinks(
  winHome: string,
  entries: LinkManifestEntry[],
) {
  const home = getHome()

  for (const entry of entries) {
    const windowsPath = typeof entry === 'string' ? entry : entry.windows
    const linuxPath = typeof entry === 'string' ? entry : entry.linux
    const target = path.join(winHome, windowsPath)
    const linkPath = path.join(home, linuxPath)

    const linkExists = existsSync(linkPath)
    const isSymlink = linkExists && lstatSync(linkPath).isSymbolicLink()
    const currentLinkTarget = isSymlink ? readlinkSync(linkPath) : undefined

    if (!needsSymlinkUpdate(currentLinkTarget, target)) {
      continue
    }

    if (linkExists) {
      console.log(
        `${linkPath} already exists${isSymlink ? ` -> ${currentLinkTarget}` : ' (not a symlink)'}, desired target: ${target}`,
      )

      const replacePrompt = await safeTryAsync(
        confirm({
          message: `Replace ${linkPath}?`,
          default: false,
        }),
      )
      cleanExit(replacePrompt)

      if (!replacePrompt.data) {
        continue
      }

      unlinkSync(linkPath)
    }

    mkdirSync(path.dirname(linkPath), { recursive: true })
    symlinkSync(target, linkPath)
  }
}

/**
Candidate paths for the 1Password ssh-sign binary used from WSL, resolved from the Windows home
and checked in order: the direct 1Password install path, then the WindowsApps store path
(where the binary carries an `.exe` extension).
*/
export function resolveOpSshSignCandidatesLinux(winHome: string) {
  const localAppData = path.posix.join(winHome, 'AppData', 'Local')

  return [
    path.posix.join(localAppData, '1Password', 'app', '8', 'op-ssh-sign-wsl'),
    path.posix.join(
      localAppData,
      'Microsoft',
      'WindowsApps',
      'op-ssh-sign-wsl.exe',
    ),
  ]
}

/**
Builds the generated `local.gitconfig` for Linux: OS include first, then the machine-specific
1Password ssh-sign path (the `core.sshCommand` value is portable and lives in the tracked
`linux.gitconfig` instead).
*/
export function buildLocalGitconfigLinux(opSshSignProgram: string) {
  return `[include]
\tpath = linux.gitconfig
[gpg "ssh"]
\tprogram = "${opSshSignProgram}"
`
}

/**
Regenerates the Linux `local.gitconfig` from {@link generatedContent}, converging with any
existing file: writes directly if absent, otherwise diffs and prompts overwrite/keep, printing
the full generated content on "keep" so the user can hand-merge selectively.
*/
async function regenerateLocalGitconfigLinux(generatedContent: string) {
  const localGitconfigPath = path.join(getHome(), 'local.gitconfig')
  const existingContent = existsSync(localGitconfigPath)
    ? readFileSync(localGitconfigPath).toString()
    : undefined

  if (!contentDiffers(existingContent, generatedContent)) {
    return
  }

  if (existingContent == undefined) {
    writeFileSync(localGitconfigPath, generatedContent)
    return
  }

  console.log('local.gitconfig differs from the generated content:')
  console.log('--- current ---')
  console.log(existingContent)
  console.log('--- generated ---')
  console.log(generatedContent)

  const overwritePrompt = await safeTryAsync(
    confirm({
      message: 'Overwrite local.gitconfig with the generated content?',
      default: false,
    }),
  )
  cleanExit(overwritePrompt)

  if (!overwritePrompt.data) {
    console.log(
      'Keeping existing local.gitconfig. Generated content for hand-merging:',
    )
    console.log(generatedContent)
    return
  }

  writeFileSync(localGitconfigPath, generatedContent)
}

export async function setupDotConfigLinux() {
  const shouldPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to setup dotConfig?',
      default: false,
    }),
  )
  cleanExit(shouldPrompt)
  if (!shouldPrompt.data) {
    return
  }

  console.log('Resolving Windows home')
  const winHome = resolveWindowsHome()

  console.log('Reading link manifest')
  const manifestPath = path.join(winHome, '.config', 'wsl-links.json')
  const entries = parseLinkManifest(readFileSync(manifestPath).toString())

  console.log('Creating symlinks')
  await createSymlinks(winHome, entries)

  console.log('Probing for op-ssh-sign-wsl')
  const opSshSignProgram = findExistingPath(
    resolveOpSshSignCandidatesLinux(winHome),
    existsSync,
  )

  if (opSshSignProgram == undefined) {
    console.log(
      'Could not find the op-ssh-sign-wsl binary in any known 1Password install location. Aborting.',
    )
    cleanExit()
    return
  }

  console.log('Generating local config')
  await regenerateLocalGitconfigLinux(
    buildLocalGitconfigLinux(opSshSignProgram),
  )

  console.log('Setting pwsh as login shell')
  execSync('chsh -s "$(which pwsh)"')
}
