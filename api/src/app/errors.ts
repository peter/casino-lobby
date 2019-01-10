export const statusCodes = {
  INVALID: 422 // Unprocessable Entity
}

interface HasStatus {
  status: number
}

type ErrorWithStatus = Error | HasStatus

export function createError (message: string, status?: number): ErrorWithStatus {
  const error: any = new Error(message)
  error.status = status || statusCodes.INVALID
  return error
}

export function validationError (message: string) {
  return createError(message, statusCodes.INVALID)
}

export default {
  statusCodes,
  createError,
  validationError
}
