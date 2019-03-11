const logger = require('fancy-log')
const { port } = require('./config/config')
const app = require('./app/app')

app.listen(port, () => {
  logger.info(`magic happening on port ${port}`)
})
