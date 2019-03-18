const validatePayload = require('./validatePayload')

module.exports = (payload) => {
  const smsFields = ['message', 'sender', 'receiver']
  return validatePayload(smsFields, payload)
}
