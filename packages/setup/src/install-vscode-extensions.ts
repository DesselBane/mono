import path from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { assertNotNil, safeTry, safeTryAsync } from '@desselbane/ts-helpers'
import { confirm } from '@inquirer/prompts'
import { cleanExit, execSync } from './helper'

assertNotNil(process.env.USERPROFILE)

const extensionsPath = path.resolve(
  path.join(process.env.USERPROFILE, '.config', 'vscode-extensions.txt'),
)

export async function installVSCodeExtensions() {
  const shouldInstallPrompt = await safeTryAsync(
    confirm({
      message: 'Do you want to install all VS Code extensions?',
      default: false,
    }),
  )
  cleanExit(shouldInstallPrompt)
  if (!shouldInstallPrompt.data) {
    return
  }

  if (!existsSync(extensionsPath)) {
    console.error(
      `Could not find extensions file at ${extensionsPath}. Is the dot config repo set up?`,
    )
    process.exit(1)
  }

  const extensions = readFileSync(extensionsPath).toString().split('\n')

  console.log(
    `The following extensions will be installed: \n${extensions.join('\n')}`,
  )

  for (const item of extensions) {
    const { error } = safeTry(() => {
      execSync(`code --install-extension ${item}`)
    })

    if (error != undefined) {
      console.error(`Failed to install ${item}`)
    }
  }
}
