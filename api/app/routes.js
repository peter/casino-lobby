const gamesController = require('app/controllers/games')

const API_PREFIX = 'v1'

const routes = [
  {
    method: 'get',
    path: `/${API_PREFIX}/games`,
    handler: gamesController.list
  }
]

module.exports = routes
