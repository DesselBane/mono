export * from './array/is-included'
export * from './serde'
export * from './lazy/lazy'
export * from './safe-try/safe-try'
export * from './safe-try/finally-for-maybe-promise'
export * from './wait-async/wait-async'
export * from './assertions'
export * from './objects/keylike-to-string'
export * from './strings/kebab-case'

/**
 * This function is not doing anything and should be used with mocks
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function noop(..._arguments: unknown[]): any {
  // This function is not doing anything and should be used with mocks
}
