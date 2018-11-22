const {parseGamesFilter, getGames} = require('app/services/games')

async function list (req, res, next) {
  // TODO: get games filter from req.query
  const filterParams = parseGamesFilter(req.query)
  const {limit, offset} = req.query
  const data = await getGames({filterParams, limit, offset})
  res.json(data)
}

module.exports = {
  list
}
