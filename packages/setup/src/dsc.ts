import path from 'node:path'
import { safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import { cleanExit, execSync } from './helper'

const dscPath = path.resolve(
  path.join(import.meta.dirname),
  'resources',
  'development.winget',
)

export async function runDeveloperDSC() {
  const shouldRunPrompt = await safeTryAsync(
    confirm({
      message: 'Run Developer DSC module?',
      default: false,
    }),
  )
  cleanExit(shouldRunPrompt)
  if (!shouldRunPrompt.data) {
    return
  }

  console.log('Enableing DevDrive')
  execSync('fsutil devdrv enable')

  console.log('Applying DSC Config')
  execSync(`winget configure --accept-configuration-agreements "${dscPath}"`)
}
