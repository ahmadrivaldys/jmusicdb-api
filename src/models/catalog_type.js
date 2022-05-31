const tables = require('../../config/tables')
const Model = require('./init-model')

class CatalogType extends Model
{
    static get tableName()
    {
        return tables.catalog_types
    }
}

module.exports = CatalogType