const tables = require('../../config/tables')
const Model = require('./init-model')

class BlacklistedToken extends Model
{
    static get tableName()
    {
        return tables.blacklisted_tokens
    }
}

module.exports = BlacklistedToken