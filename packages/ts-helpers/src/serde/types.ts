/**
 * Replacer function which is used by JSON.stringify as second argument
 */
export type ReplacerFunction = (key: string, value: unknown) => unknown

export const noopReplacer: ReplacerFunction = (_, value) => value
