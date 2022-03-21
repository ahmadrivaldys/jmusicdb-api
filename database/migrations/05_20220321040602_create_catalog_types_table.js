const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.catalog_types, function(table)
    {
        table.specificType('id', 'CHAR(8)').primary()
        table.string('name', 10).notNullable()
        table.integer('order', 2).notNullable()
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.catalog_types)
}