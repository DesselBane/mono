#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { checkbox, confirm } from '@inquirer/prompts'
import { safeTryAsync } from '@desselbane/ts-helpers'
import config from './program.config.json'

console.log('Bootstraping Windows, hold on to your socks')

type Choice = Parameters<typeof checkbox>[0]['choices'][number]

const [error, results] = await safeTryAsync(() =>
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

if (error != undefined) {
  console.log('Exiting... 👋')
  process.exit(0)
}

console.log(JSON.stringify(results, undefined, 2))

console.log('Will install the following programms:')

for (const program of results) {
  console.log(`- ${program.Name}`)
}

const [error2, result2] = await safeTryAsync(() =>
  confirm({
    message: 'Continue?',
    default: false,
  }),
)

if (error2 != undefined || !result2) {
  console.log('Exiting... 👋')
  process.exit(0)
}

execSync(
  `sudo winget install --accept-package-agreements --accept-source-agreements ${results.map((x) => `"${x.WingetId}"`).join(' ')}`,
  {
    stdio: 'inherit',
  },
)
