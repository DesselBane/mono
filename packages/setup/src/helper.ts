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

/**
Runs {@link command} and returns its trimmed stdout instead of inheriting it.
Use this when the caller needs the command's output (e.g. resolving a path).
*/
export function execSyncCapture(command: string) {
  return execSyncNode(command).toString().trim()
}

/**
Returns the first {@link candidates} entry that {@link exists} reports as present, or `undefined`
if none exist. Used to probe machine-specific install locations that vary across hosts.
*/
export function findExistingPath(
  candidates: string[],
  exists: (candidate: string) => boolean,
) {
  return candidates.find((candidate) => exists(candidate))
}

/**
Whether {@link candidate} exists on disk, including Windows app-execution aliases
(e.g. the WindowsApps `op-ssh-sign.exe`), where `stat`-based checks like `existsSync`
fail with EACCES because they follow the alias reparse point — {@link lstat} does not.
*/
export function existsIncludingAppAliases(
  candidate: string,
  lstat: (candidate: string) => unknown,
) {
  const [error] = safeTry(() => lstat(candidate))

  return error == undefined
}

/**
Whether {@link generated} content differs from the {@link existing} file content.
`undefined` existing content (file absent) always counts as differing.
*/
export function contentDiffers(
  existing: string | undefined,
  generated: string,
) {
  return existing !== generated
}
