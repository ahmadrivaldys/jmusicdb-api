const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const Artist = bookshelf.model('Artist', {
    tableName: table.artists
})

module.exports = Artist