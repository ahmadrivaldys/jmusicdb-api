const tables = require('../../config/tables')

exports.up = function(knex)
{
    return knex.schema.createTable(tables.catalogs, function(table)
    {
        table.specificType('id', 'CHAR(21)').primary()
        table.string('title', 150).notNullable()
        table.specificType('catalog_type_id', 'CHAR(8)').notNullable()
        table.foreign('catalog_type_id').references('id').inTable(tables.catalog_types)
        table.string('main_artists_id', 120).notNullable()
        table.string('featuring_artists_id', 120)
        table.date('release_date').notNullable()
        table.string('slug', 150).notNullable()
        table.string('image_cover', 50)
        table.specificType('author_id', 'CHAR(36)').notNullable()
        table.foreign('author_id').references('uuid').inTable(tables.admin_accounts)
        table.timestamps(true, true)
    })
}

exports.down = function(knex)
{
    return knex.schema.dropTable(tables.catalogs)
}