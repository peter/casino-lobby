const fs = require('fs')
const util = require('util')
const express = require('express')
const app = express()
const gameSchema = require('./game-schema')

const API_PREFIX = 'v1'

// NOTE: By wrapping async Express handlers in this helper function we make
// sure that any error thrown in the handler is handled by the express error
// handler via next. See:
// https://github.com/Abazhenov/express-async-handler/blob/master/index.js
function asyncHandler (handler) {
  return function (...args) {
    const fnReturn = handler(...args)
    const next = args[args.length - 1]
    return Promise.resolve(fnReturn).catch(next)
  }
}

function parseFilterParams (queryParams) {
  if (!queryParams) return undefined
  const validFieldNames = Object.keys(gameSchema.properties)
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
      return String.prototype.toString.call(game[key]) === value
    })
  }
}

async function getGames (filterParams) {
  const allGames = await readAllGames()
  return allGames.filter(gamesFilter(filterParams))
}

function validationError (message) {
  const error = new Error(message)
  error.status = 422
  return error
}

app.get(`/${API_PREFIX}/games`, asyncHandler(async (req, res, next) => {
  // TODO: get games filter from req.query
  const filterParams = parseFilterParams(req.query)
  const games = await getGames(filterParams)
  res.json({games})
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
