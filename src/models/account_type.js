const table = require('../../config/tables')
const database = require('../../config/database')

const AccountType = database.model('AccountType', {
    tableName: table.account_types
})

module.exports = AccountType