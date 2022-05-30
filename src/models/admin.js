
const { Model } = require('objection')
const knex = require('../../config/database')

Model.knex(knex)

class Admin extends Model
{
    static get tableName()
    {
        return 'tbl_admin_accounts'
    }
}

module.exports = Admin