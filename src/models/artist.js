const table = require('../../config/tables')
const database = require('../../config/database')

const Artist = database.model('Artist', {
    tableName: table.artists
})

module.exports = Artist