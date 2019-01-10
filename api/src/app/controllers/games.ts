const {parseGamesFilter, getGames} = require('app/services/games')

export async function list (req: any, res: any, next: Function): Promise<void> {
  // TODO: get games filter from req.query
  const filterParams = parseGamesFilter(req.query)
  const {limit, offset} = req.query
  const data = await getGames({filterParams, limit, offset})
  res.json(data)
}

export default {
  list
}
