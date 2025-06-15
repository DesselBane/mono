import { AssertionError } from '../assertions/assertion-error'

/**
 * Convert a short string into kebab case.
 * @throws AssertionError As this implementation uses a regex which might be succeptible to a ReDOS attack the maximum size of `value` is limited to be no more than 1000 characters. ({@link AssertionError})
 * @param value The input value in any casing
 * @returns The input value in kebab case
 */
export const kebabCaseForShortStrings = (value: string) => {
  if (value.length > 1000) {
    throw new AssertionError('Input must be less than 1000 chars', {
      value,
      maxLength: 1000,
      length: value.length,
    })
  }

  return value.replaceAll(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs === 0 ? '' : '-') + $.toLowerCase(),
  )
}
