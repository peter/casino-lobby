import * as R from 'ramda'

export function isMissing (value) {
  return value == null || R.isEmpty(value)
}

export const isPresent = R.complement(isMissing)

export function compact (collection) {
  if (collection == null) return undefined
  if (Array.isArray(collection)) {
    return R.filter(isPresent, collection)
  } else {
    return R.pickBy(isPresent, collection)
  }
}

export default {
  isMissing,
  isPresent,
  compact
}
