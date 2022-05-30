
const Model = require('./init-model')
const Song = require('./song')
const CatalogType = require('./catalog_type')

class Catalog extends Model
{
    static get tableName()
    {
        return 'tbl_catalogs'
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
                    from: 'tbl_songs.catalog_id',
                    to: 'tbl_catalogs.id'
                }
            },
            type:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: CatalogType,
                join:
                {
                    from: 'tbl_catalogs.catalog_type_id',
                    to: 'tbl_catalog_types.id'
                }
            }
        }
    }
}

module.exports = Catalog