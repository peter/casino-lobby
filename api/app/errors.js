const status = {
  INVALID: 422 // Unprocessable Entity
}

function createError (message, status) {
  const error = new Error(message)
  error.status = 422
  return error
}

function validationError (message) {
  return createError(message, status.INVALID)
}

module.exports = {
  status,
  createError,
  validationError
}
