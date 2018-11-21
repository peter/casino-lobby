const axios = require('axios')
const server = require('./server')

test('start - starts the server on a given port and responds to GET /v1/games', async () => {
  const port = 3001
  const options = {port}
  const _server = await server.start(options)
  expect(_server).not.toBeNull()
  const baseUrl = `http://localhost:${port}`
  const gamesUrl = `${baseUrl}/v1/games`
  const response = await axios.get(gamesUrl)
  expect(response.status).toEqual(200)
})
