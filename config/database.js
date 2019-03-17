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
  },
  test: {
    ...defaultConfig, database: config.testDbName,
  },
  production: {
    use_env_variable: config.databaseUrl,
    dialect: config.databaseDialect
  },
}

module.exports = database
