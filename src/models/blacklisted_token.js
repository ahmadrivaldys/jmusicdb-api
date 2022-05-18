const table = require('../../config/tables')
const database = require('../../config/database')

const BlacklistedToken = database.model('BlacklistedToken', {
    tableName: table.blacklisted_tokens
})

module.exports = BlacklistedToken