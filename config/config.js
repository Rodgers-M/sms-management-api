require('dotenv').config();
const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test', 'staging'])
    .required(),
  PORT: joi.number().default(8080),
  DATABASE: joi.string().required(),
  TEST_DB: joi.string().required(),
  DATABASE_DIALECT: joi.string().default('postgres'),
  DATABASE_PASSWORD: joi.string().default(null),
  DATABASE_USER: joi.string().required(),
  HOST: joi.string().required(),
  DATABASE_URL: joi.string().default(null),
  DATABASE_PORT: joi.string().default(5432)
})
  .unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}


const config = {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT,
  dbName: envVars.DATABASE,
  testDbName: envVars.TEST_DB,
  dbUsername: envVars.DATABASE_USER,
  databaseDialect: envVars.DATABASE_DIALECT,
  dbPassword: envVars.password,
  host: envVars.HOST,
  databaseUrl: envVars.DATABASE_URL,
  databasePort: envVars.DATABASE_PORT
};

module.exports = config;
