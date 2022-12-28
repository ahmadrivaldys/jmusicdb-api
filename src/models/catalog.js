const tables = require('../../config/tables')
const Model = require('../../config/model')
const Song = require('./Song')
const CatalogType = require('./CatalogType')

class Catalog extends Model
{
    static get tableName()
    {
        return tables.catalogs
    }
  
    static get relationMappings()
    {
        return {
            songs:
            {
                relation: Model.HasManyRelation,
                modelClass: Song,
                join:
                {
                    from: `${tables.songs}.catalog_id`,
                    to: `${tables.catalogs}.id`
                }
            },
            type:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: CatalogType,
                join:
                {
                    from: `${tables.catalogs}.catalog_type_id`,
                    to: `${tables.catalog_types}.id`
                }
            }
        }
    }
}

module.exports = Catalog