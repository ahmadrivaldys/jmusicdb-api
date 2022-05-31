const tables = require('../../config/tables')
const Model = require('./init-model')

class Admin extends Model
{
    static get tableName()
    {
        return tables.admin_accounts
    }
}

module.exports = Admin