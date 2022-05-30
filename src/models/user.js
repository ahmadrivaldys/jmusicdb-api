
const { Model, knex } = require('./init-model')

class User extends Model
{
    static get tableName()
    {
        return 'tbl_user_accounts'
    }
}

module.exports = { User, knex }