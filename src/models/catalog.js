const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const AccountType = bookshelf.model('AccountType', {
    tableName: table.account_types
})

const Admin = bookshelf.model('Admin', {
    tableName: table.admin_accounts,
    hidden: ['password', 'account_type_id'],
    account_types()
    {
        return this.hasOne(AccountType, 'account_type_id')
    }
})

const Catalog = bookshelf.model('Catalog', {
    tableName: table.catalogs,
    hidden: ['catalog_type_id', 'author_id'],
    author()
    {
        return this.belongsTo(Admin, 'author_id', 'uuid')
    },
})

module.exports = Catalog