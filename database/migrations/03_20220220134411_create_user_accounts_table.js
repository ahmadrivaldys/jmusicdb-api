const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.user_accounts, function(table)
    {
        table.specificType('uuid', 'CHAR(36)').primary()
        table.string('username', 20).unique().notNullable()
        table.string('fullname', 50).notNullable()
        table.string('email', 50).unique().notNullable()
        table.string('password').notNullable()
        table.string('photo', 50)
        table.string('bio', 150)
        table.string('socmed', 75)
        table.integer('account_type_id').unsigned().notNullable()
        table.foreign('account_type_id').references('id').inTable(tables.account_types)
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.user_accounts)
}