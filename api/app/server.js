const express = require('express')
const routes = require('app/routes')

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

function start () {
  const app = express()
  for (const route of routes) {
    app[route.method](route.path, asyncHandler(route.handler))
  }
  app.use(errorHandler)
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  return app
}

module.exports = {
  start
}
