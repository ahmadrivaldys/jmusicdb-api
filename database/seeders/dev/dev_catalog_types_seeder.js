const tables = require('../../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.catalog_types).del().then(function()
    {
        // Data
        data =
        [
            { id: 'yHxzeeQa', name: 'Single', order: 1 },
            { id: 'lBaD9uOZ', name: 'EP', order: 2 },
            { id: 'd0oB_25O', name: 'Album', order: 3 }
        ]

        // Insert seed entries
        return knex(tables.catalog_types).insert(data)
    })
}