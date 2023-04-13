const tables = require('../../config/tables')
const Model = require('../../config/model')
const AccountType = require('./AccountType')

class User extends Model
{
    static get tableName()
    {
        return tables.user_accounts
    }

    static get relationMappings()
    {
        return {
            account_type:
            {
                relation: Model.BelongsToOneRelation,
                modelClass: AccountType,
                join:
                {
                    from: `${tables.user_accounts}.account_type_id`,
                    to: `${tables.account_types}.id`
                }
            }
        }
    }
}

module.exports = User
