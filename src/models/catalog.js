const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)
const Admin = require('./admin')
const CatalogType = require('./catalog_type')

const Catalog = bookshelf.model('Catalog', {
    tableName: table.catalogs,
    hidden: ['catalog_type_id', 'author_id'],
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