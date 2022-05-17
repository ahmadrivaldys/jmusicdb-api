const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const Admin = bookshelf.model('Admin', {
    tableName: table.admin_accounts
})

module.exports = Admin