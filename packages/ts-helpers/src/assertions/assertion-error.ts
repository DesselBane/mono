import type { UnknownRecord } from 'type-fest'
import { createErrorReplacer, createCircularReferenceReplacer } from '../serde'

export type AssertionContext = UnknownRecord

export class AssertionError extends Error {
  private readonly context: AssertionContext
  constructor(
    message: string,
    // eslint-disable-next-line unicorn/custom-error-definition -- Kept to not introduce breaking changes
    context: AssertionContext,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'AssertionError'
    this.context = context
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      context: this.context,
    }
  }

  override toString() {
    return JSON.stringify(
      this,
      createErrorReplacer(createCircularReferenceReplacer()),
      ' ',
    )
  }
}
