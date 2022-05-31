const tables = require('../../config/tables')
const Model = require('./init-model')
const Admin = require('./admin')
const Catalog = require('./catalog')

class Song extends Model
{
    static get tableName()
    {
        return tables.songs
    }
  
    static get relationMappings()
    {
        return {
            catalog:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: Catalog,
                join:
                {
                    from: `${tables.songs}.catalog_id`,
                    to: `${tables.catalogs}.id`
                }
            },
            author:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join:
                {
                    from: `${tables.songs}.author_id`,
                    to: `${tables.admin_accounts}.uuid`
                }
            }
        }
    }
}

module.exports = Song