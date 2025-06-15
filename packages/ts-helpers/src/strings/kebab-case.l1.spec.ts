import { kebabCaseForShortStrings } from './kebab-case'

describe('kebab-case', () => {
  it.each([
    ['StackOverflow', 'stack-overflow'],
    ['camelCase', 'camel-case'],
    ['alllowercase', 'alllowercase'],
    ['ALLCAPITALLETTERS', 'allcapitalletters'],
    ['CustomXMLParser', 'custom-xml-parser'],
    ['APIFinder', 'api-finder'],
    ['JSONResponseData', 'json-response-data'],
    ['Person20Address', 'person20-address'],
    ['UserAPI20Endpoint', 'user-api20-endpoint'],
  ])('should convert %s into %s', (input, expectedResult) => {
    expect(kebabCaseForShortStrings(input)).toBe(expectedResult)
  })

  it('should throw for input larger than 1000 chars', () => {
    let value = 'A'
    for (let index = 0; index < 1000; index++) {
      value += 'A'
    }

    expect(() => kebabCaseForShortStrings(value)).toThrow(
      expect.objectContaining({
        name: 'AssertionError',
        message: 'Input must be less than 1000 chars',
        context: {
          value,
          maxLength: 1000,
          length: value.length,
        },
      }),
    )
  })
})
