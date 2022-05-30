
const { Model } = require('objection')
const knex = require('../../config/database')
const Admin = require('./admin')
const Catalog = require('./catalog')

Model.knex(knex)

class Song extends Model
{
    static get tableName()
    {
        return 'tbl_songs'
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
                    from: 'tbl_songs.catalog_id',
                    to: 'tbl_catalogs.id'
                }
            },
            author:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join:
                {
                    from: 'tbl_songs.author_id',
                    to: 'tbl_admin_accounts.uuid'
                }
            }
        }
    }
}

module.exports = Song