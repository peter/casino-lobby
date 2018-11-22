const R = require('ramda')

function isMissing (value) {
  return value == null || R.isEmpty(value)
}

const isPresent = R.complement(isMissing)

function compact (collection) {
  if (collection == null) return undefined
  if (Array.isArray(collection)) {
    return R.filter(isPresent, collection)
  } else {
    return R.pickBy(isPresent, collection)
  }
}

function assertValidOptions (options, validKeys) {
  const invalidKeys = R.difference(Object.keys(options), validKeys)
  if (!R.isEmpty(invalidKeys)) {
    throw new Error(`Found the following invalid keys in options: ${invalidKeys.join(', ')}. Valid keys are: ${validKeys.join(', ')}`)
  }
}

// NOTE: this function could be extended to do script type checks and/or type coercion (non-strict)
function optionsWithDefaults (options, defaultOptions) {
  const result = R.merge(defaultOptions, compact(options))
  assertValidOptions(result, Object.keys(defaultOptions))
  return result
}

module.exports = {
  isMissing,
  isPresent,
  compact,
  assertValidOptions,
  optionsWithDefaults
}
