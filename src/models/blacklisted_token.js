
const { Model } = require('objection')
const knex = require('../../config/database')

Model.knex(knex)

class BlacklistedToken extends Model
{
    static get tableName()
    {
        return 'tbl_blacklisted_tokens'
    }
}

module.exports = BlacklistedToken