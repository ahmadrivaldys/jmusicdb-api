const tables = require('../../config/tables')
const Model = require('../../config/model')

class BlacklistedToken extends Model
{
    static get tableName()
    {
        return tables.blacklisted_tokens
    }
}

module.exports = BlacklistedToken