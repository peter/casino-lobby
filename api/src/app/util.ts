import * as R from 'ramda'

type nil = null | undefined
type Collection = object | any[]

export function isMissing (value: any): boolean {
  return value == null || R.isEmpty(value)
}

export const isPresent = R.complement(isMissing)

export function compact (collection: Collection | nil): Collection | undefined {
  if (collection == null) return undefined
  if (Array.isArray(collection)) {
    return R.filter(isPresent, collection)
  } else {
    return R.pickBy(isPresent, collection)
  }
}

export function assertValidOptions (options: object, validKeys: string[]): void {
  const invalidKeys = R.difference(Object.keys(options), validKeys)
  if (!R.isEmpty(invalidKeys)) {
    throw new Error(`Found the following invalid keys in options: ${invalidKeys.join(', ')}. Valid keys are: ${validKeys.join(', ')}`)
  }
}

export function optionsWithDefaults (options: object, defaultOptions: object): object {
  const result = R.merge(defaultOptions, compact(options))
  assertValidOptions(result, Object.keys(defaultOptions))
  return result
}

export default {
  isMissing,
  isPresent,
  compact,
  assertValidOptions,
  optionsWithDefaults
}
