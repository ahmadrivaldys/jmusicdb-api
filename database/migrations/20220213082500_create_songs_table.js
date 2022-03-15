const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.songs, function(table)
    {
        table.uuid('uuid').primary().defaultTo(knex.raw('(UUID())'))
        table.string('title', 150).notNullable()
        table.integer('album_id', 5).unsigned().notNullable()
        table.string('artists_id', 15).notNullable()
        table.date('release_date')
        table.string('duration', 10).notNullable()
        table.string('slug', 150).notNullable()
        table.integer('author_id', 3).unsigned().notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.songs)
}