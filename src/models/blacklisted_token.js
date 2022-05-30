
const { Model, knex } = require('./init-model')

class BlacklistedToken extends Model
{
    static get tableName()
    {
        return 'tbl_blacklisted_tokens'
    }
}

module.exports = { BlacklistedToken, knex }