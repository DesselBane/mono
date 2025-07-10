import { execSync as execSyncNode } from 'node:child_process'
import { safeTry } from '@desselbane/ts-helpers'
import type { SafeTryReturn, SafeTryReturnData } from '@desselbane/ts-helpers'

export type Choice<Value> = {
  value: Value
  name?: string
  description?: string
  short?: string
  disabled?: boolean | string
  checked?: boolean
  type?: never
}

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
