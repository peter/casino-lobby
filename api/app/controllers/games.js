const {parseGamesFilter, getGames} = require('app/services/games')

async function list (req, res, next) {
  // TODO: get games filter from req.query
  const filterParams = parseGamesFilter(req.query)
  const games = await getGames(filterParams)
  res.json({games})
}

module.exports = {
  list
}
