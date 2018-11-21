const statusCodes = {
  INVALID: 422 // Unprocessable Entity
}

function createError (message, status) {
  const error = new Error(message)
  error.status = 422
  return error
}

function validationError (message) {
  return createError(message, statusCodes.INVALID)
}

module.exports = {
  statusCodes,
  createError,
  validationError
}
