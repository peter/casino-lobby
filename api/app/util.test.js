const {assertValidOptions} = require('./util')

test('assertValidOptions - throws error if options object has invalid keys', async () => {
  assertValidOptions({}, ['foo'])
  assertValidOptions({foo: 1}, ['foo', 'bar'])
  assertValidOptions({foo: 1, bar: 2}, ['foo', 'bar'])
  expect(() => assertValidOptions({foo: 1, bar: 2, baz: 3}, ['foo', 'bar'])).toThrowError(/invalid keys/)
})
