import type * as n from 'node:fs'
import { vi } from 'vitest'
import { SpyNotSetupError } from '../../utils'

export const globSync = vi.fn<typeof n.globSync>(() => {
  throw new SpyNotSetupError()
})
export const readFileSync = vi.fn<typeof n.readFileSync>(() => {
  throw new SpyNotSetupError()
})
export const writeFileSync = vi.fn<typeof n.writeFileSync>(() => {
  throw new SpyNotSetupError()
})
