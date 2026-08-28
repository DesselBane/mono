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

export type ConfigItem = {
  Name: string
  WingetId?: string
  AptId?: string
  aptPrereq?: string
  linuxInstall?: string
  installDefault: boolean
  group: string
}

export type Choices = (Choice<ConfigItem> | Separator)[]

/**
Whether {@link item} declares an install method for {@link platform}.
*/
export function isInstallableOnPlatform(
  item: ConfigItem,
  platform: NodeJS.Platform,
) {
  if (platform === 'win32') {
    return item.WingetId != undefined
  }

  return item.AptId != undefined || item.linuxInstall != undefined
}

/**
Builds the checkbox choices for {@link platform}, disabling entries without an install method.
*/
export function buildChoicesForPlatform(
  items: readonly ConfigItem[],
  platform: NodeJS.Platform,
) {
  const choices: Choices = []

  function mapConfigItem(item: ConfigItem): Choices[number] {
    const installable = isInstallableOnPlatform(item, platform)

    return {
      value: item,
      name: item.Name,
      checked: installable && item.installDefault,
      disabled: installable
        ? false
        : `not available for ${platform === 'win32' ? 'Windows' : 'Linux'}`,
    } as const
  }

  for (const group of groupPrio) {
    choices.push(new Separator(group))
    const groupMembers = items.filter((x) => x.group === group)

    choices.push(
      ...groupMembers
        .filter((x) => x.installDefault)
        .map((x) => mapConfigItem(x)),
      ...groupMembers
        .filter((x) => !x.installDefault)
        .map((x) => mapConfigItem(x)),
    )
  }

  return choices
}

export type LinuxInstallPlan = {
  aptPrereqs: string[]
  aptIds: string[]
  linuxInstalls: string[]
}

/**
Splits selected {@link items} into the apt prerequisite/batch/curl-fallback steps needed to install them on Linux.
*/
export function buildLinuxInstallPlan(
  items: readonly ConfigItem[],
): LinuxInstallPlan {
  const aptPrereqs = [
    ...new Set(
      items.map((x) => x.aptPrereq).filter((x): x is string => x != undefined),
    ),
  ]

  const aptIds = items
    .map((x) => x.AptId)
    .filter((x): x is string => x != undefined)

  const linuxInstalls = items
    .filter((x) => x.AptId == undefined)
    .map((x) => x.linuxInstall)
    .filter((x): x is string => x != undefined)

  return { aptPrereqs, aptIds, linuxInstalls }
}

function installOnWindows(items: readonly ConfigItem[]) {
  wingetInstall(items.map((x) => `"${x.WingetId}"`).join(' '))
}

function installOnLinux(items: readonly ConfigItem[]) {
  const { aptPrereqs, aptIds, linuxInstalls } = buildLinuxInstallPlan(items)

  for (const aptPrereq of aptPrereqs) {
    execSync(aptPrereq)
  }

  if (aptIds.length > 0) {
    execSync(`sudo apt-get install -y ${aptIds.join(' ')}`)
  }

  for (const linuxInstall of linuxInstalls) {
    execSync(linuxInstall)
  }
}

export async function installPrograms() {
  if (process.platform === 'win32') {
    const updateInstalledProgramsPrompt = await safeTryAsync(
      confirm({
        message: 'Do you want to update all currently installed Programs?',
        default: false,
      }),
    )
    cleanExit(updateInstalledProgramsPrompt)

    if (updateInstalledProgramsPrompt.data) {
      execSync('winget update -r')
    }
  }

  const installProgramsPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to install additional programs?',
      default: false,
    }),
  )
  cleanExit(installProgramsPrompt)
  if (!installProgramsPrompt.data) {
    return
  }

  const choices = buildChoicesForPlatform(config, process.platform)

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

  const continuePrompt = await safeTryAsync(() => {
    return confirm({
      message: 'Continue?',
      default: false,
    })
  })

  if (continuePrompt.error != undefined || !continuePrompt.data) {
    cleanExit()
  }

  if (process.platform === 'win32') {
    installOnWindows(whichProgramsPrompt.data)
  } else {
    installOnLinux(whichProgramsPrompt.data)
  }
}
