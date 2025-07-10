import { execSync as execSyncNode } from 'node:child_process'
import { safeTry } from '@desselbane/ts-helpers'
import type { SafeTryReturn, SafeTryReturnData } from '@desselbane/ts-helpers'
import type { checkbox } from '@inquirer/prompts'

export type Choice = Parameters<typeof checkbox>[0]['choices'][number]

export function isAdmin() {
  if (process.platform !== 'win32') {
    return false
  }

  const [error] = safeTry(() =>
    execSyncNode(`fsutil dirty query ${process.env.systemdrive}`),
  )

  return error == undefined
}

export function cleanExit<TValue>(
  safeReturn?: SafeTryReturn<TValue>,
): asserts safeReturn is SafeTryReturnData<TValue> {
  if (safeReturn != undefined && safeReturn.error == undefined) {
    return
  }

  console.log('Exiting... 👋')
  process.exit(0)
}

export function wingetInstall(packageName: string) {
  safeTry(() => {
    execSync(
      `winget install --accept-package-agreements --accept-source-agreements ${packageName}`,
    )
  })
}
export function execSync(command: string) {
  execSyncNode(command, {
    stdio: 'inherit',
  })
}
