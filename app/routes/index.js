const HttpStatus = require('http-status')
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../../swagger.json');
const smsRoutes = require('./smsRoutes')
const contactRoutes = require('./contactRoutes')

const routes = app => {
  app.use('/sms', smsRoutes)
  app.use('/contacts', contactRoutes)
  app.get('/', (req, res) => res.status(HttpStatus.OK).send('welcome to sms API, visit /api-docs on your browser for documentation'))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  //any route apart from the above defined
    app.use('*', (req, res) => res.status(HttpStatus.NOT_FOUND).json({message:'path not found, please check and try again'}))

  return app
}

module.exports = routes
