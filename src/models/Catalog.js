const tables = require('../../config/tables')
const Model = require('../../config/model')
const Admin = require('./Admin')
const Artist = require('./Artist')
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
            },
            author:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join:
                {
                    from: `${tables.catalogs}.author_id`,
                    to: `${tables.admin_accounts}.uuid`
                }
            },
            main_artists:
            {
                relation: Model.ManyToManyRelation,
                modelClass: Artist,
                join:
                {
                    from: `${tables.catalogs}.id`,
                    through:
                    {
                        from: `${tables.catalogs_main_artists}.catalog_id`,
                        to: `${tables.catalogs_main_artists}.artist_id`
                    },
                    to: `${tables.artists}.id`
                }
            },
            featuring_artists:
            {
                relation: Model.ManyToManyRelation,
                modelClass: Artist,
                join:
                {
                    from: `${tables.catalogs}.id`,
                    through:
                    {
                        from: `${tables.catalogs_featuring_artists}.catalog_id`,
                        to: `${tables.catalogs_featuring_artists}.artist_id`
                    },
                    to: `${tables.artists}.id`
                }
            }
        }
    }
}

module.exports = Catalog
