const API_PREFIX = 'v1'
const gamesController = require('app/controllers/games')

const routes = [
  {
    method: 'get',
    path: `/${API_PREFIX}/games`,
    handler: gamesController.list
  }
]

module.exports = routes
