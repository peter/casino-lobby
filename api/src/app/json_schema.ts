const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true})

export function validate (schema: object, data: any): any[] {
  const validate = ajv.compile(schema)
  validate(data)
  return validate.errors
}

export default {
  validate
}
