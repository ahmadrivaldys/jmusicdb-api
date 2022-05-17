const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)
const Admin = require('./admin')
const Catalog = require('./catalog')

const Song = bookshelf.model('Song', {
    tableName: table.songs,
    // hidden: ['catalog_id', 'author_id'],
    visible: ['id', 'title', 'track_no', 'release_date', 'duration', 'slug', 'created_at', 'updated_at', 'author.fullname', 'catalog.title', 'catalog.type.name'],
    author()
    {
        return this.belongsTo(Admin, 'author_id', 'uuid')
    },
    catalog()
    {
        return this.belongsTo(Catalog, 'catalog_id')
    }
})

module.exports = Song