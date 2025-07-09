import type { SafeTryReturn, SafeTryReturnData } from '@desselbane/ts-helpers'
import type { checkbox } from '@inquirer/prompts'

export type Choice = Parameters<typeof checkbox>[0]['choices'][number]

export function cleanExit<TValue>(
  safeReturn?: SafeTryReturn<TValue>,
): asserts safeReturn is SafeTryReturnData<TValue> {
  if (safeReturn != undefined && safeReturn.error == undefined) {
    return
  }

  console.log('Exiting... 👋')
  process.exit(0)
}
