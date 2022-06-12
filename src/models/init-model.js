const { Model } = require('objection')
const database = require('../../config/database')

Model.knex(database)

module.exports = Model