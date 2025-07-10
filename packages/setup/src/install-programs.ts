import { checkbox, confirm } from '@inquirer/prompts'
import { safeTryAsync } from '@desselbane/ts-helpers'
import { cleanExit, execSync, wingetInstall } from './helper'
import type { Choice } from './helper'
import config from './program.config.json'

export async function installPrograms() {
  const updateInstalledProgramsPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to update all currently installed Programs?',
      default: true,
    }),
  )
  cleanExit(updateInstalledProgramsPrompt)

  if (updateInstalledProgramsPrompt.data) {
    execSync('winget update -r')
  }

  const installProgramsPrompt = await safeTryAsync(
    checkbox({
      message: 'Which apps should be installed?',
      choices: config.map(
        (x) =>
          ({
            value: x,
            name: x.Name,
            checked: x.installDefault,
          }) satisfies Choice,
      ),
      loop: false,
    }),
  )
  cleanExit(installProgramsPrompt)

  if (installProgramsPrompt.data.length === 0) {
    console.log('Nothing selected...')
    return
  }

  console.log('Will install the following programms:')

  for (const program of installProgramsPrompt.data) {
    console.log(`- ${program.Name}`)
  }

  const continuePrompt = await safeTryAsync(() =>
    confirm({
      message: 'Continue?',
      default: false,
    }),
  )

  if (continuePrompt.error != undefined || !continuePrompt.data) {
    cleanExit()
  }

  wingetInstall(
    installProgramsPrompt.data.map((x) => `"${x.WingetId}"`).join(' '),
  )
}
