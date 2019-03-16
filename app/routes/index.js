const HttpStatus = require('http-status')
const smsRoutes = require('./smsRoutes')

const routes = app => {
  app.use('/sms', smsRoutes)
  app.get('/', (req, res) => res.status(HttpStatus.OK).send('welcome to sms API'))
  //any route apart from the above defined
  app.use('*', (req, res) => res.status(HttpStatus.NOT_FOUND).send('path not found'))
  return app
}

module.exports = routes
