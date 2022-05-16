const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const BlacklistedToken = bookshelf.model('BlacklistedToken', {
    tableName: table.blacklisted_tokens
})

module.exports = BlacklistedToken