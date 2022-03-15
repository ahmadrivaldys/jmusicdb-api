const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.blacklisted_tokens, function(table)
    {
        table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'))
        table.string('token').notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.blacklisted_tokens)
}