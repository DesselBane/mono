/**
 * Check if a value is part of an array of type TValue[]. If so inform typescript that value must be of type TValue.
 * @example
 * ```ts
 * const SUPPORTED_LOCALES = ['en-US', 'en-PT'] as const
 * const maybeLocale: string = 'en-US'
 *
 * // This will error since string can not be part of a ('en-US' | 'en-PT')[] array.
 * if(!SUPPORTED_LOCALES.includes(maybeLocale)){
 *   // Do some default handling
 * }
 *
 * if(isIncluded(SUPPORTED_LOCALES, maybeLocale)){
 *   // TS now understands that maybeLocale is of type 'en-US' | 'en-PT'
 * } else {
 *   // Do some default handling
 * }
 *
 * ```
 *
 * @param array
 * @param value
 */
export function isIncluded<TValue>(
  array: readonly TValue[],
  value: unknown,
): value is TValue {
  return array.includes(value as never)
}
