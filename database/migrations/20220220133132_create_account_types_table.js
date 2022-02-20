const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.account_types, function(table)
    {
        table.increments('id', 2)
        table.string('name', 20).notNullable()
        table.integer('order', 2).notNullable()
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.account_types)
}