const { Model, knex } = require('./init-model')

class CatalogType extends Model
{
    static get tableName()
    {
        return 'tbl_catalog_types'
    }
}

module.exports = { CatalogType, knex }