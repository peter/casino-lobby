const R = require('ramda')

function assertValidOptions (options, validKeys) {
  const invalidKeys = R.difference(Object.keys(options), validKeys)
  if (!R.isEmpty(invalidKeys)) {
    throw new Error(`Found the following invalid keys in options: ${invalidKeys.join(', ')}. Valid keys are: ${validKeys.join(', ')}`)
  }
}

module.exports = {
  assertValidOptions
}