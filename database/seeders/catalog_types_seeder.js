const tables = require('../../config/tables')
const { nanoid } = require('nanoid')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.catalog_types).del().then(function()
    {
        // Data
        data =
        [
            { id: nanoid(8), name: 'Single', order: 1 },
            { id: nanoid(8), name: 'EP', order: 2 },
            { id: nanoid(8), name: 'Album', order: 3 }
        ]

        // Insert seed entries
        return knex(tables.catalog_types).insert(data)
    })
}