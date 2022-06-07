const tables = require('../../config/tables')
const Model = require('./init-model')
const AccountType = require('./account_type')

class Admin extends Model
{
    static get tableName()
    {
        return tables.admin_accounts
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
                    from: `${tables.admin_accounts}.account_type_id`,
                    to: `${tables.account_types}.id`
                }
            }
        }
    }
}

module.exports = Admin