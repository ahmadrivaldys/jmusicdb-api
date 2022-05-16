const table = require('../../config/tables')
const database = require('../../config/database')
const bookshelf = require('bookshelf')(database)

const CatalogType = bookshelf.model('CatalogType', {
    tableName: table.catalog_types
})

module.exports = CatalogType