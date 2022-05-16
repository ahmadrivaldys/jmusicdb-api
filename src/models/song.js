const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const Admin = bookshelf.model('Admin', {
    tableName: table.admin_accounts,
    visible: ['fullname']
})

const CatalogType = bookshelf.model('CatalogType', {
    tableName: table.catalog_types
})

const Catalog = bookshelf.model('Catalog', {
    tableName: table.catalogs,
    visible: ['title', 'type.name'],
    type()
    {
        return this.belongsTo(CatalogType, 'catalog_type_id')
    }
})

const Song = bookshelf.model('Song', {
    tableName: table.songs,
    hidden: ['catalog_id', 'author_id', 'created_at', 'updated_at'],
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