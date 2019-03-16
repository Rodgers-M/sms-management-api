const handleSuccess = (res, statusCode, message) => res.status(statusCode).json({message})

const handleFailure = (res, statusCode, error) => {
  message = error.message
  return res.status(statusCode).json({message})
}

const handleSuccessResult = (res, statusCode, results ) => res.status(statusCode).json({
  message: 'success',
  results
})

module.exports = {
  handleSuccess,
  handleFailure,
  handleSuccessResult,
}
