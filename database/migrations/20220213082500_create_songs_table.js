const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.songs, function(table)
    {
        table.specificType('id', 'CHAR(21)').primary()
        table.string('title', 150).notNullable()
        table.integer('album_id', 5).unsigned().notNullable()
        table.string('artists_id', 15).notNullable()
        table.date('release_date')
        table.string('duration', 10).notNullable()
        table.string('slug', 150).notNullable()
        table.specificType('author_id', 'CHAR(36)').notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.songs)
}