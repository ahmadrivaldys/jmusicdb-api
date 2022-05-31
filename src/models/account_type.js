const tables = require('../../config/tables')
const Model = require('./init-model')

class AccountType extends Model
{
    static get tableName()
    {
        return tables.account_types
    }
}

module.exports = AccountType