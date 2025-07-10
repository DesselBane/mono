import { execSync } from 'node:child_process'
import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { assertNotNil, safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import { cleanExit, wingetInstall } from './helper'

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
const gpgSshProgram = path
  .join(LOCALAPPDATA, '1Password', 'app', '8', 'op-ssh-sign.exe')
  .replaceAll('\\', '/')

function exec(command: string) {
  execSync(command, {
    stdio: 'inherit',
  })
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
  exec('pwsh -c "Add-WindowsCapability -Online -Name OpenSSH.Client*"')

  console.log('Installing OpenSSH Server')
  exec('pwsh -c "Add-WindowsCapability -Online -Name OpenSSH.Server*"')

  console.log('Disabling SSH-Agent in preparation for 1password')
  exec('pwsh -c "Get-Service ssh-agent | Set-Service -StartupType Disabled"')

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

  console.log('Generating local config')
  writeFileSync(
    localGitconfigPath,
    `[gpg "ssh"]
  program = "${gpgSshProgram}"
[core]
    sshCommand = C:/Windows/System32/OpenSSH/ssh.exe
`,
  )

  console.log('Setting temporary .gitconfig')

  writeFileSync(
    gitconfigPath,
    `[include]
    path = local.gitconfig
  `,
  )

  console.log('Checking out git repo')

  exec(
    `git clone --bare git@github.com:DesselBane/config.git ${USERPROFILE}/.dotCfg`,
  )

  console.log('Done: Cloning')

  exec(
    `git --work-tree ${USERPROFILE} --git-dir=${USERPROFILE}/.dotCfg checkout master -f`,
  )

  console.log('Done: Checkout')

  exec(
    `git --work-tree ${USERPROFILE} --git-dir=${USERPROFILE}/.dotCfg config --local status.showUntrackedFiles no`,
  )

  console.log('Done: Config')
}
