const tables = require('../../config/tables')
const Model = require('./init-model')

class User extends Model
{
    static get tableName()
    {
        return tables.user_accounts
    }
}

module.exports = User