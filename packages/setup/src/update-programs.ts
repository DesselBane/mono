import { execSync } from 'node:child_process'
import { confirm } from '@inquirer/prompts'
import { safeTry, safeTryAsync } from '@desselbane/ts-helpers'
import { cleanExit } from './helper'

export async function upgradePrograms() {
  const updateInstalledProgramsPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to update all currently installed Programs?',
      default: true,
    }),
  )

  cleanExit(updateInstalledProgramsPrompt)
  if (!updateInstalledProgramsPrompt.data) {
    return
  }

  safeTry(() =>
    execSync('winget update -q Microsoft.AppInstaller', {
      stdio: 'inherit',
    }),
  )

  const restartPrompt = await safeTryAsync(
    confirm({
      message:
        'If Microsoft.AppInstaller installed an update a reboot is required. Do you want to reboot now?',
      default: false,
    }),
  )
  cleanExit(restartPrompt)

  if (restartPrompt.data) {
    execSync('shutdown /r /t 0', { stdio: 'inherit' })
    process.exit(0)
  }

  execSync('sudo winget update -r', {
    stdio: 'inherit',
  })
}
