import * as u from 'app/util'

test('isMissing/isPresent - returns true/false for null/undefined and empty arrays and objects', () => {
  const missingValues = [null, undefined, {}, []]
  for (const missingValue of missingValues) {
    expect(u.isMissing(missingValue)).toBeTruthy()
    expect(u.isPresent(missingValue)).toBeFalsy()
  }
  const notMissingValues = [true, false, 5, 'foobar', ['foo'], {foo: 1}, function () {}]
  for (const missingValue of notMissingValues) {
    expect(u.isMissing(missingValue)).toBeFalsy()
    expect(u.isPresent(missingValue)).toBeTruthy()
  }
})

test('compact - removes missing values from arrays', () => {
  expect(u.compact([null, undefined, [], 5, false])).toEqual([5, false])
})

test('compact - removes missing values from objects', () => {
  expect(u.compact({foo: false, bar: null, baz: undefined, bla: []})).toEqual({foo: false})
})

test('compact - returns undefiend for null', () => {
  expect(u.compact(null)).toEqual(undefined)
  expect(u.compact(undefined)).toEqual(undefined)
})

test('assertValidOptions - throws error if options object has invalid keys', async () => {
  u.assertValidOptions({}, ['foo'])
  u.assertValidOptions({foo: 1}, ['foo', 'bar'])
  u.assertValidOptions({foo: 1, bar: 2}, ['foo', 'bar'])
  expect(() => u.assertValidOptions({foo: 1, bar: 2, baz: 3}, ['foo', 'bar'])).toThrowError(/invalid keys/)
})

test('optionsWithDefaults - returns options merged with default options and checks all keys have defaults', async () => {
  const defaultOptions = {foo: false, bar: 2}
  const options = {foo: true}
  expect(u.optionsWithDefaults(options, defaultOptions)).toEqual({foo: true, bar: 2})
  expect(() => u.optionsWithDefaults({invalidKey: true}, defaultOptions)).toThrowError(/invalid keys/)
})
