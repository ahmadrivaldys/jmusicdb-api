const table = require('../../config/tables')
const database = require('../../config/database')

const User = database.model('User', {
    tableName: table.user_accounts
})

module.exports = User