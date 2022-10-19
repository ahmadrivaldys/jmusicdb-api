const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.account_types, function(table)
    {
        table.specificType('id', 'CHAR(8)').primary()
        table.string('name', 20).notNullable()
        table.string('category', 5).notNullable()
        table.integer('category_order', 2).notNullable()
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.account_types)
}