export function assertNotNil<TValue>(
  data: TValue,
  message = `Data was nil`,
  assertionContext?: Record<string, unknown>,
): asserts data is Exclude<TValue, null | undefined> {
  if (data == undefined) {
    assertionContext ??= {
      actualValue: data,
      expectedValue: 'Not null and not undefined',
    }

    throw new Error(message, { cause: assertionContext })
  }
}
