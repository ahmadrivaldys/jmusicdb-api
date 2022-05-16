const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const User = bookshelf.model('User', {
    tableName: table.user_accounts,
    hidden: ['password']
})

module.exports = User