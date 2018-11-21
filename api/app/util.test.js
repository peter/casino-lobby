const u = require('./util')

test('assertValidOptions - throws error if options object has invalid keys', async () => {
  u.assertValidOptions({}, ['foo'])
  u.assertValidOptions({foo: 1}, ['foo', 'bar'])
  u.assertValidOptions({foo: 1, bar: 2}, ['foo', 'bar'])
  expect(() => u.assertValidOptions({foo: 1, bar: 2, baz: 3}, ['foo', 'bar'])).toThrowError(/invalid keys/)
})

test('isMissing - returns true for null/undefined and empty arrays and objects', () => {
  const missingValues = [null, undefined, {}, []]
  for (const missingValue of missingValues) {
    expect(u.isMissing(missingValue)).toBeTruthy()
  }
  const notMissingValues = [true, false, 5, 'foobar', ['foo'], {foo: 1}, function () {}]
  for (const missingValue of notMissingValues) {
    expect(u.isMissing(missingValue)).toBeFalsy()
  }
})
