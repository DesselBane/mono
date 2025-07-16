export const globSync = vi.fn<() => string[]>(() => {
  throw new Error('Mock globSync not initialized')
})
export const readFileSync = vi.fn<(path: string) => Buffer>(() => {
  throw new Error('Mock readFileSync not initialized')
})
export const writeFileSync = vi.fn<(path: string, content: string) => void>(
  () => {
    throw new Error('Mock writeFileSync not initialized')
  },
)
