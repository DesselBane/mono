import type * as n from 'node:child_process'

export const execSync = vi.fn<typeof n.execSync>(() => {
  throw new Error('Not Initialized')
})
