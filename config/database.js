const config = require('./config')

const defaultConfig = {
  database: config.databaseName,
  username: config.dbUsername,
  password: config.dbPassword,
  host: config.host,
  dialect: config.databaseDialect,
}

const database = {
  development: {
    ...defaultConfig,
    use_env_variable: 'DATABASE_URL',
  },
  test: {
    ...defaultConfig, database: config.testDbName,
  },
  production: {
    ...defaultConfig,
    use_env_variable: 'DATABASE_URL',
    dialect: config.databaseDialect
  },
}

module.exports = database
