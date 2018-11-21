const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true})

function validate (schema, data) {
  const validate = ajv.compile(schema)
  validate(data)
  return validate.errors
}

module.exports = {
  validate
}
