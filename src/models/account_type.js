const Model = require('./init-model')

class AccountType extends Model
{
    static get tableName()
    {
        return 'tbl_account_types'
    }
}

module.exports = AccountType