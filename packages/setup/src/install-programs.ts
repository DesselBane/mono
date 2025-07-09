import { execSync } from 'node:child_process'
import { checkbox, confirm } from '@inquirer/prompts'
import { safeTryAsync } from '@desselbane/ts-helpers'
import { cleanExit } from './helper'
import type { Choice } from './helper'
import config from './program.config.json'

export async function installPrograms() {
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

  execSync(
    `sudo winget install --accept-package-agreements --accept-source-agreements ${installProgramsPrompt.data.map((x) => `"${x.WingetId}"`).join(' ')}`,
    {
      stdio: 'inherit',
    },
  )
}
