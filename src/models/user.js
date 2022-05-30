
const { Model } = require('objection')
const knex = require('../../config/database')

Model.knex(knex)

class User extends Model
{
    static get tableName()
    {
        return 'tbl_user_accounts'
    }
}

module.exports = User