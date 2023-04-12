const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.catalogs_featuring_artists, function(table)
    {
        table.specificType('catalog_id', 'CHAR(21)').notNullable()
        table.foreign('catalog_id').references('id').inTable(tables.catalogs)
        table.specificType('artist_id', 'CHAR(21)').notNullable()
        table.foreign('artist_id').references('id').inTable(tables.artists)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.catalogs_featuring_artists)
}