import * as matchers from 'jest-extended'
import { expect } from 'vitest'

function setupJestExtended() {
  expect.extend(matchers)
}

const { t } = vi.hoisted(() => {
  return { t: vi.fn((...arguments_: unknown[]) => JSON.stringify(arguments_)) }
})

vi.mock('vue-i18n', () => ({
  useI18n: vi.fn(() => ({
    t,
  })),
}))

async function setupVueI18n() {
  try {
    const { config } = await import('@vue/test-utils')

    config.global.mocks = {
      $t: t,
    }

    config.global.renderStubDefaultSlot = true
  } catch {
    // If vue test utils is not installed the import will throw an error but overall it's fine
  }
}

vi.mock('@vueuse/core', async (importOriginal) => {
  const org: Record<string, unknown> = await importOriginal()
  return {
    ...org,
    createSharedComposable: (delegate: unknown) => {
      return delegate
    },
  }
})

setupJestExtended()
await setupVueI18n()
