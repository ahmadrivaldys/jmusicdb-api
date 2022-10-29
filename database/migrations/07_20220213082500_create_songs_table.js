const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.songs, function(table)
    {
        table.specificType('id', 'CHAR(21)').primary()
        table.string('title', 150).notNullable()
        table.integer('track_no', 3).notNullable()
        table.specificType('catalog_id', 'CHAR(21)').notNullable()
        table.foreign('catalog_id').references('id').inTable(tables.catalogs)
        table.string('main_artists_id', 120).notNullable()
        table.string('featuring_artists_id', 120)
        table.date('release_date').notNullable()
        table.string('duration', 10).notNullable()
        table.string('slug', 150).notNullable()
        table.specificType('author_id', 'CHAR(36)').notNullable()
        table.foreign('author_id').references('uuid').inTable(tables.admin_accounts)
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.songs)
}