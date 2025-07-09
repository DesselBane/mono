import { expect } from 'vitest'
import main from './main'

describe('dummy', () => {
  it('should not error', () => {
    expect(() => {
      main()
    }).not.toThrow()
  })
})
