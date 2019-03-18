const validatePayload = require('./validatePayload')

module.exports = (payload) => {
  const contactFields = ['name', 'phone']
  return validatePayload(contactFields, payload)
}
