
const { Model } = require('objection')
const knex = require('../../config/database')

Model.knex(knex)

class CatalogType extends Model
{
    static get tableName()
    {
        return 'tbl_catalog_types'
    }
}

module.exports = CatalogType