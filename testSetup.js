const databaseCleaner = require('./databaseCleaner')
const db = require('./database/models')

global.db = db

beforeAll(async() => {
  await databaseCleaner.clean(global.db)
})

afterAll(async() => {
  await databaseCleaner.clean(global.db)
})

