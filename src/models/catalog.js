const table = require('../../config/tables')
const bookshelf = require('../../config/database')
const Admin = require('./admin')
const CatalogType = require('./catalog_type')

const Catalog = bookshelf.model('Catalog', {
    tableName: table.catalogs,
    hidden: [
        'catalog_type_id',
        'artists_id',
        'author_id',
        'type.id',
        'type.order',
        'songs.track_no',
        'songs.release_date',
        'songs.created_at',
        'songs.updated_at',
        'author.uuid',
        'author.username',
        'author.email',
        'author.photo',
        'author.bio',
        'author.socmed',
        'author.created_at',
        'author.updated_at'
    ],
    author()
    {
        return this.belongsTo(Admin, 'author_id', 'uuid')
    },
    type()
    {
        return this.belongsTo(CatalogType, 'catalog_type_id')
    }
})

module.exports = Catalog