import { checkbox, confirm, Separator } from '@inquirer/prompts'
import { safeTryAsync } from '@desselbane/ts-helpers'
import { cleanExit, execSync, wingetInstall } from './helper'
import type { Choice } from './helper'
import config from './program.config.json'

const groupPrio = [
  'Core',
  'CLI',
  'Programming',
  'Media',
  'Util',
  'Peripherals',
] as const

export type Choices = (Choice<(typeof config)[number]> | Separator)[]

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
    confirm({
      message: 'Do you want to install additional programs?',
      default: true,
    }),
  )
  cleanExit(installProgramsPrompt)
  if (!installProgramsPrompt.data) {
    return
  }

  const choices: Choices = []

  function mapConfigItem(item: (typeof config)[number]): Choices[number] {
    return {
      value: item,
      name: item.Name,
      checked: item.installDefault,
    } as const
  }

  for (const group of groupPrio) {
    choices.push(new Separator(group))
    const groupMembers = config.filter((x) => x.group === group)

    choices.push(
      ...groupMembers
        .filter((x) => x.installDefault)
        .map((x) => mapConfigItem(x)),
      ...groupMembers
        .filter((x) => !x.installDefault)
        .map((x) => mapConfigItem(x)),
    )
  }

  const whichProgramsPrompt = await safeTryAsync(
    checkbox({
      message: 'Which apps should be installed?',
      choices,
      loop: false,
    }),
  )
  cleanExit(whichProgramsPrompt)

  if (whichProgramsPrompt.data.length === 0) {
    console.log('Nothing selected...')
    return
  }

  console.log('Will install the following programms:')

  for (const program of whichProgramsPrompt.data) {
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
    whichProgramsPrompt.data.map((x) => `"${x.WingetId}"`).join(' '),
  )
}
