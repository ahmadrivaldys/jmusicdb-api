const tables = require('../../config/tables')
const Model = require('../../config/model')
const AccountType = require('./AccountType')

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