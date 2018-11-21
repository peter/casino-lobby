const fs = require('fs')
const util = require('util')
const {isMissing} = require('app/util')
const gamesSchema = require('app/services/games_schema')
const {validationError} = require('app/errors')

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
      if (!isMissing(game[key])) {
        return game[key].toString() === value
      } else {
        return value === ''
      }
    })
  }
}

async function getGames (options = {}) {
  const allGames = await readAllGames()
  return allGames.filter(gamesFilter(options.filterParams))
}

module.exports = {
  parseGamesFilter,
  getGames
}
