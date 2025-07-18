/* eslint-disable no-empty-pattern */
import { execSync } from 'node:child_process'
import { it as itVitest } from 'vitest'
import type { MockInstance } from 'vitest'
import { noop } from './noop'

export type Use<T> = (value: T) => Promise<void>

export const baseTest = itVitest.extend<{
  execSyncSpy: MockInstance<typeof execSync>
  consoleLogSpy: MockInstance<typeof console.log>
  processExitSpy: MockInstance<typeof process.exit>
}>({
  execSyncSpy: [
    async ({}, use) => {
      const execSyncSpy = vi.mocked(execSync)
      execSyncSpy.mockImplementation(noop)

      await use(execSyncSpy)
    },
    { scope: 'test' },
  ],
  consoleLogSpy: [
    async ({}, use: Use<MockInstance<typeof console.log>>) => {
      const consoleLogSpy = vi.spyOn(console, 'log')
      consoleLogSpy.mockImplementation(noop)

      await use(consoleLogSpy)

      consoleLogSpy.mockRestore()
    },
    { scope: 'test' },
  ],

  processExitSpy: [
    async ({}, use: Use<MockInstance<typeof process.exit>>) => {
      const processExitSpy = vi.spyOn(process, 'exit')
      processExitSpy.mockImplementation(noop as never)

      await use(processExitSpy)

      processExitSpy.mockRestore()
    },
    { scope: 'test' },
  ],
})
export const it = baseTest
