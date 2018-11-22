const fs = require('fs')
const util = require('util')
const {isPresent, optionsWithDefaults} = require('app/util')
const gamesSchema = require('app/services/games_schema')
const {validationError} = require('app/errors')

const DEFAULT_LIMIT = 100

function parseGamesFilter (queryParams) {
  if (!queryParams) return undefined
  const validFieldNames = Object.keys(gamesSchema.properties)
  return Object.entries(queryParams).reduce((acc, [key, value]) => {
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

async function readAllGames () {
  const GAMES_FILE_PATH = '../all-games.json'
  const ENCODING = 'utf8'
  const readFile = util.promisify(fs.readFile)
  return readFile(GAMES_FILE_PATH, ENCODING).then(data => {
    return JSON.parse(data)
  })
}

function gamesFilter (filterParams) {
  return (game) => {
    return Object.entries(filterParams || {}).every(([key, value]) => {
      if (Array.isArray(game[key])) {
        return value.split(',').every(item => game[key].includes(item))
      } else if (isPresent(game[key])) {
        return game[key].toString() === value
      } else {
        return value === ''
      }
    })
  }
}

async function getGames (options = {}) {
  options = optionsWithDefaults(options, {filterParams: {}, limit: DEFAULT_LIMIT, offset: 0})
  const offset = parseInt(options.offset)
  const limit = parseInt(options.limit)
  const allGames = await readAllGames()
  const filteredGames = allGames.filter(gamesFilter(options.filterParams))
  const slicedGames = filteredGames.slice(offset, (offset + limit))
  return {
    count: filteredGames.length,
    games: slicedGames
  }
}

module.exports = {
  parseGamesFilter,
  getGames
}
