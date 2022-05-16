const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const AccountType = bookshelf.model('AccountType', {
    tableName: table.account_types
})

module.exports = AccountType