import { keylikeToString } from './keylike-to-string'

describe(keylikeToString, () => {
  it.each([
    {
      title: 'Returns strings as is',
      input: 'foobar',
      expectedResult: 'foobar',
    },
    {
      title: 'Stringifies numbers',
      input: 3,
      expectedResult: '3',
    },
    {
      title: 'Stringifies NaN',
      input: Number.NaN,
      expectedResult: 'NaN',
    },
    {
      title: 'Returns a symbols description',
      input: Symbol('foobar'),
      expectedResult: 'foobar',
    },
    {
      title: 'Returns the default value if a symbol has no description',
      input: Symbol(),
      defaultValue: 'foobar',
      expectedResult: 'foobar',
    },
  ])('$title', ({ input, defaultValue, expectedResult }) => {
    expect(keylikeToString(input, defaultValue)).toBe(expectedResult)
  })
})
