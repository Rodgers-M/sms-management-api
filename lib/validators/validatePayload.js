module.exports = (requiredFields, payload) => {
  const errors = {}
  requiredFields.forEach(field => {
    if(!payload[field]){
      errors[field] = `error, ${field} is required`
    } else if (!payload[field].trim().length) {
      errors[field] = `error, ${field} can not be blank`
    }
  })
  return errors
}
