const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const AccountType = bookshelf.model('AccountType', {
    tableName: table.account_types
})

const Admin = bookshelf.model('Admin', {
    tableName: table.admin_accounts,
    hidden: ['password', 'account_type_id'],
    account_type()
    {
        return this.hasOne(AccountType, 'account_type_id')
    }
})

module.exports = Admin