
const { Model, knex } = require('./init-model')

class Admin extends Model
{
    static get tableName()
    {
        return 'tbl_admin_accounts'
    }
}

module.exports = { Admin, knex }