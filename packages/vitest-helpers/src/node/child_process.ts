import type * as n from 'node:child_process'
import { SpyNotSetupError } from '../utils'

export const execSync = vi.fn<typeof n.execSync>(() => {
  throw new SpyNotSetupError()
})
