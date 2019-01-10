const {statusCodes, validationError} = require('./errors')

test('validationError - creates Error object with a status', () => {
  const message = 'Your input is invalid'
  const error = validationError(message)
  expect(error.message).toEqual(message)
  expect(error.status).toEqual(statusCodes.INVALID)
  expect(error.stack).not.toBeNull()
  expect(error).toBeInstanceOf(Error)
})
