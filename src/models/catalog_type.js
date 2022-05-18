const table = require('../../config/tables')
const database = require('../../config/database')

const CatalogType = database.model('CatalogType', {
    tableName: table.catalog_types
})

module.exports = CatalogType