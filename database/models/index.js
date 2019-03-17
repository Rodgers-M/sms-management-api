const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { env } = require('../../config/config')
const dbConfig = require('../../config/database')

const envDbConfig = dbConfig[env]
const db = {}
const basename = path.basename(__filename);

let sequelize
if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(envDbConfig.use_env_variable,null, null, {
    dialect: 'postgres'
  })
} else {
  sequelize = new Sequelize(envDbConfig.database, envDbConfig.username, envDbConfig.password, {
    host: envDbConfig.host,
    dialect: envDbConfig.dialect,
    logging: false,
  })
}


fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model;
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
