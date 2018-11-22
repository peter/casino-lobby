const axios = require('axios')
const {startServer, stopServer} = require('../setup')
const config = require('../config')
const gamesSchema = require('app/services/games_schema')
const jsonSchema = require('app/json_schema')
const R = require('ramda')

beforeAll(startServer)
afterAll(stopServer)

async function getGames (params = {}) {
  const gamesUrl = `${config.baseUrl}/v1/games`
  const response = await axios.get(gamesUrl, {params})
  expect(response.status).toEqual(200)
  return response.data.games
}

test('GET /v1/games - returns all games and they comply with the JSON schema', async () => {
  const games = await getGames()
  expect(games.length).toEqual(100)
  for (const game of games) {
    const schemaErrors = jsonSchema.validate(gamesSchema, game)
    expect(schemaErrors).toBeNull()
  }
})

test('GET /v1/games?filter.gameProvider=MICRO - returns all games with gameProvider=MICRO', async () => {
  const games = await getGames({'filter.gameProvider': 'MICRO'})
  expect(games.length).toBeGreaterThan(0)
  expect(R.uniq(games.map(R.prop('gameProvider')))).toEqual(['MICRO'])
})

test('GET /v1/games?filter.gameCollectionIds=top-rated,test-pilot - returns all games that include top-rated and test-pilot', async () => {
  const ids = ['top-rated', 'test-pilot']
  const games = await getGames({'filter.gameCollectionIds': ids.join(',')})
  expect(games.length).toBeGreaterThan(0)
  for (const game of games) {
    expect(ids.every(id => game.gameCollectionIds.includes(id))).toBeTruthy()
  }
})

test('GET /v1/games?filter.tags=TABLE,LIVE,ROULETTE - returns all games that include matching tags', async () => {
  const ids = ['TABLE', 'LIVE', 'ROULETTE']
  const games = await getGames({'filter.tags': ids.join(',')})
  expect(games.length).toBeGreaterThan(0)
  for (const game of games) {
    expect(ids.every(id => game.tags.includes(id))).toBeTruthy()
  }
})

test('GET /v1/games?limit=3offset=2 - returns games at index 2, 3, and 4 in the listing', async () => {  
  const limit = 3
  const offset = 2
  const limitWithoutOffset = limit + offset
  const gamesWithoutOffset = await getGames({limit: limitWithoutOffset})
  expect(gamesWithoutOffset.length).toEqual(limitWithoutOffset)

  const games = await getGames({limit, offset})
  expect(games.length).toEqual(limit)
  expect(games).toEqual(gamesWithoutOffset.slice(offset))
})
