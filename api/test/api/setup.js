const server = require('app/server')
const config = require('./config')
const util = require('util')

let _server = null

async function startServer () {
  if (_server) return _server // Only start server once
  const options = {port: config.port}
  _server = await server.start(options)
  return _server
}

async function stopServer () {
  if (_server) {
    const closeServer = util.promisify(_server.close.bind(_server))
    await closeServer()
  }
}

module.exports = {
  startServer,
  stopServer
}
