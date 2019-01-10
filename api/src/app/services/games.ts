const fs = require('fs')
const util = require('util')
import {isPresent, optionsWithDefaults} from 'app/util'
import gamesSchema from 'app/services/games_schema'
import {validationError} from 'app/errors'

const DEFAULT_LIMIT = 100

interface Params {
  [key: string]: any
}

interface Games {
  count: number
  games: object[]
}

type Filter = (game: object) => boolean

export function parseGamesFilter (queryParams: object): Params | undefined {
  if (!queryParams) return undefined
  const validFieldNames = Object.keys(gamesSchema.properties)
  return Object.entries(queryParams).reduce((acc: Params, [key, value]) => {
    if (key.startsWith('filter.')) {
      const fieldName = key.split('.')[1]
      if (validFieldNames.includes(fieldName)) {
        acc[fieldName] = value
      } else {
        throw validationError(`Field name ${fieldName} in filter query param not found in schema. Available fields are: ${validFieldNames.join(', ')}`)
      }
    }
    return acc
  }, {})
}

async function readAllGames (): Promise<object[]> {
  const GAMES_FILE_PATH = '../all-games.json'
  const ENCODING = 'utf8'
  const readFile = util.promisify(fs.readFile)
  return readFile(GAMES_FILE_PATH, ENCODING).then((data: string) => {
    return JSON.parse(data)
  })
}

function gamesFilter (filterParams: object): Filter {
  return (game: any) => {
    return Object.entries(filterParams || {}).every(([key, value]) => {
      if (Array.isArray(game[key])) {
        return value.split(',').every((item: any) => game[key].includes(item))
      } else if (isPresent(game[key])) {
        return game[key].toString() === value
      } else {
        return value === ''
      }
    })
  }
}

export async function getGames (options = {}): Promise<Games> {
  const _options: any = optionsWithDefaults(options, {filterParams: {}, limit: DEFAULT_LIMIT, offset: 0})
  const offset = parseInt(_options.offset, 10)
  const limit = parseInt(_options.limit, 10)
  const allGames = await readAllGames()
  const filteredGames = allGames.filter(gamesFilter(_options.filterParams))
  const slicedGames = filteredGames.slice(offset, (offset + limit))
  return {
    count: filteredGames.length,
    games: slicedGames
  }
}

export default {
  parseGamesFilter,
  getGames
}
