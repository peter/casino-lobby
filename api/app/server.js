const http = require('http')
const express = require('express')
const routes = require('app/routes')
const {assertValidOptions} = require('app/util')

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

function errorHandler (error, req, res, next) {
  const status = error.status || 500
  if (status === 500) {
    console.error(`errorHandler caught error ${error.message}`, error.stack)
  }
  const data = {
    status,
    errors: [{message: error.message}]
  }
  res.status(status).json(data)
}

function start (options = {}) {
  assertValidOptions(options, ['port'])
  const app = express()
  const server = http.createServer(app)
  for (const route of routes) {
    app[route.method](route.path, asyncHandler(route.handler))
  }
  app.use(errorHandler)
  const PORT = process.env.PORT || options.port || 3000
  return new Promise((resolve, reject) => {
    server.listen(PORT)
    server.on('listening', () => {
      console.log(`Server started on port ${PORT}`)
      resolve(server)
    })
    server.on('error', (error) => {
      console.log(`Error thrown when starting server: ${error}`, error)
      reject(error)
    })
  })
}

module.exports = {
  start
}
