const table = require('../../config/tables')
const database = require('../../config/database')

const Admin = database.model('Admin', {
    tableName: table.admin_accounts,
    hidden: ['password', 'account_type_id']
})

module.exports = Admin