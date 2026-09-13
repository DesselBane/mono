import path from 'node:path'
import { existsSync, lstatSync, readFileSync, writeFileSync } from 'node:fs'
import { assertNotNil, safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import {
  cleanExit,
  contentDiffers,
  execSync,
  execSyncCapture,
  existsIncludingAppAliases,
  findExistingPath,
  wingetInstall,
} from './helper'

assertNotNil(process.env.LOCALAPPDATA)
const LOCALAPPDATA = process.env.LOCALAPPDATA

assertNotNil(process.env.USERPROFILE)
const USERPROFILE = process.env.USERPROFILE

assertNotNil(process.env.PATH)
process.env.PATH = [
  process.env.PATH,
  path.join(LOCALAPPDATA, 'Microsoft', 'WinGet', 'Links'),
  path.join('C:', 'Program Files', 'PowerShell', '7'),
  path.join('C:', 'Program Files', 'Git', 'cmd'),
].join(';')

const gitconfigPath = path.join(USERPROFILE, '.gitconfig')
const localGitconfigPath = path.join(USERPROFILE, 'local.gitconfig')
const dotCfgGitDir = path.join(USERPROFILE, '.dotCfg')

/**
Builds the generated `local.gitconfig` for Windows: OS include first, then machine-specific values.
*/
export function buildLocalGitconfigWindows(gpgSshProgram: string) {
  return `[include]
\tpath = windows.gitconfig
[gpg "ssh"]
\tprogram = "${gpgSshProgram}"
[core]
\tsshCommand = C:/Windows/System32/OpenSSH/ssh.exe
`
}

/**
Candidate install locations for the `op-ssh-sign` binary on Windows, checked in order:
the direct 1Password install path, then the WindowsApps store path.
*/
export function resolveOpSshSignCandidatesWindows(localAppData: string) {
  return [
    path
      .join(localAppData, '1Password', 'app', '8', 'op-ssh-sign.exe')
      .replaceAll('\\', '/'),
    path
      .join(localAppData, 'Microsoft', 'WindowsApps', 'op-ssh-sign.exe')
      .replaceAll('\\', '/'),
  ]
}

/**
Whether `git status --porcelain` output (tracked files only, `status.showUntrackedFiles no`)
reports a dirty work tree.
*/
export function isDotCfgDirty(porcelainOutput: string) {
  return porcelainOutput.trim().length > 0
}

function gitDotCfgCommand(subcommand: string) {
  return `git --work-tree ${USERPROFILE} --git-dir=${dotCfgGitDir} ${subcommand}`
}

/**
Regenerates `local.gitconfig` from {@link generatedContent}, converging with any existing file:
writes directly if absent, otherwise diffs and prompts overwrite/keep, printing the full generated
content on "keep" so the user can hand-merge selectively.
*/
async function regenerateLocalGitconfig(generatedContent: string) {
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

/**
Converges the `.dotCfg` bare-repo checkout: clones if absent, otherwise fetches; on a dirty
tracked work tree, shows the diff and prompts before stashing and force-checking-out.
Returns `false` if the user aborts on a dirty tree.
*/
async function convergeDotCfgCheckout() {
  const dotCfgExists = existsSync(dotCfgGitDir)

  if (!dotCfgExists) {
    console.log('Checking out git repo')
    execSync(
      `git clone --bare git@github.com:DesselBane/config.git ${dotCfgGitDir}`,
    )
    console.log('Done: Cloning')

    execSync(gitDotCfgCommand('checkout master -f'))
    console.log('Done: Checkout')

    execSync(gitDotCfgCommand('config --local status.showUntrackedFiles no'))
    console.log('Done: Config')
    return true
  }

  console.log('Fetching git repo')
  execSync(gitDotCfgCommand('fetch'))

  const porcelainOutput = execSyncCapture(
    gitDotCfgCommand('status --porcelain'),
  )

  if (!isDotCfgDirty(porcelainOutput)) {
    execSync(gitDotCfgCommand('checkout master -f'))
    console.log('Done: Checkout')
    return true
  }

  console.log('The dotCfg work tree has uncommitted changes to tracked files:')
  execSync(gitDotCfgCommand('diff'))

  const stashPrompt = await safeTryAsync(
    confirm({
      message: 'Stash local changes and check out master?',
      default: false,
    }),
  )
  cleanExit(stashPrompt)

  if (!stashPrompt.data) {
    console.log('Aborting dotConfig step, local changes kept.')
    return false
  }

  execSync(gitDotCfgCommand('stash'))
  execSync(gitDotCfgCommand('checkout master -f'))
  console.log('Done: Checkout')
  return true
}

export async function setupDotConfig() {
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

  console.log('Installing Prerequisites')
  console.log('Installing Powershell 7')
  wingetInstall('Microsoft.PowerShell')

  console.log('Installing OpenSSH Client')
  execSync('pwsh -c "Add-WindowsCapability -Online -Name OpenSSH.Client*"')

  console.log('Installing OpenSSH Server')
  execSync('pwsh -c "Add-WindowsCapability -Online -Name OpenSSH.Server*"')

  console.log('Disabling SSH-Agent in preparation for 1password')
  execSync(
    'pwsh -c "Get-Service ssh-agent | Set-Service -StartupType Disabled"',
  )

  console.log('Installing 1password')
  wingetInstall('AgileBits.1Password')

  const confirm1passwordPrompt = await safeTryAsync(
    confirm({
      message:
        'Please setup 1password and confirm the ssh service is running. Continue?',
      default: true,
    }),
  )
  if (
    confirm1passwordPrompt.error != undefined ||
    !confirm1passwordPrompt.data
  ) {
    cleanExit()
  }

  console.log('Installing git')
  wingetInstall('Git.Git')

  console.log('Probing for op-ssh-sign')
  const gpgSshProgram = findExistingPath(
    resolveOpSshSignCandidatesWindows(LOCALAPPDATA),
    (candidate) => existsIncludingAppAliases(candidate, lstatSync),
  )

  if (gpgSshProgram == undefined) {
    console.log(
      'Could not find op-ssh-sign.exe in any known 1Password install location. Aborting.',
    )
    cleanExit()
    return
  }

  console.log('Generating local config')
  await regenerateLocalGitconfig(buildLocalGitconfigWindows(gpgSshProgram))

  const dotCfgExists = existsSync(dotCfgGitDir)

  if (!dotCfgExists) {
    console.log('Setting temporary .gitconfig')
    writeFileSync(
      gitconfigPath,
      `[include]
    path = local.gitconfig
  `,
    )
  }

  const converged = await convergeDotCfgCheckout()
  if (!converged) {
    return
  }
}
