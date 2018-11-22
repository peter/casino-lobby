import u from '@/util'

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
