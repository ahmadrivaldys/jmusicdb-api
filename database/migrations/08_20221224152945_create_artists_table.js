const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.artists, function(table)
    {
        table.specificType('id', 'CHAR(21)').primary()
        table.string('name', 150).notNullable()
        table.text('description')
        table.string('photo', 150)
        table.string('slug', 150).notNullable()
        table.specificType('author_id', 'CHAR(36)').notNullable()
        table.foreign('author_id').references('uuid').inTable(tables.admin_accounts)
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.artists)
}