#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { checkbox, confirm } from '@inquirer/prompts'
import { safeTryAsync } from '@desselbane/ts-helpers'
import config from './program.config.json'

type Choice = Parameters<typeof checkbox>[0]['choices'][number]

console.log('Bootstraping Windows, hold on to your socks')

function cleanExit(): never {
  console.log('Exiting... 👋')
  process.exit(0)
}

const updateInstalledProgramsPrompt = await safeTryAsync(
  confirm({
    message: 'Do you want to update all currently installed Programs?',
    default: true,
  }),
)

if (updateInstalledProgramsPrompt.error != undefined) {
  cleanExit()
}

if (updateInstalledProgramsPrompt.data) {
  execSync('winget update Microsoft.AppInstaller', {
    stdio: 'inherit',
  })
  execSync('sudo winget update -r', {
    stdio: 'inherit',
  })
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

if (installProgramsPrompt.error != undefined) {
  cleanExit()
}

console.log(JSON.stringify(installProgramsPrompt.data, undefined, 2))

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
