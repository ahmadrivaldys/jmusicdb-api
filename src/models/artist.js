const tables = require('../../config/tables')
const Model = require('../../config/model')
const Admin = require('./Admin')

class Artist extends Model
{
    static get tableName()
    {
        return tables.artists
    }

    static get relationMappings()
    {
        return {
            author:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: Admin,
                join:
                {
                    from: `${tables.artists}.author_id`,
                    to: `${tables.admin_accounts}.uuid`
                }
            }
        }
    }
}

module.exports = Artist