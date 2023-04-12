const tables = require('../../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.catalogs).del().then(function()
    {
        const author_id = '6cad46ed-7480-4baa-bddf-9a80de4e4e68' // UUID

        // Data
        data =
        [
            {
                id: 'mzIq5afcEuITkbOngIo6-', // Nano ID (21)
                title: 'Shiwaawase',
                catalog_type_id: 'yHxzeeQa',
                release_date: '2022-10-23',
                slug: 'shiwaawase',
                author_id
            },
            {
                id: 'tleDyUOMOfkVZzW8WCtC0',
                title: 'Kirari',
                catalog_type_id: 'lBaD9uOZ',
                release_date: '2022-10-23',
                slug: 'kirari',
                author_id
            },
            {
                id: 'RXZvJIn_SJ8kMIf2eNFjS',
                title: 'HELP EVER HURT NEVER',
                catalog_type_id: 'd0oB_25O',
                release_date: '2022-10-23',
                slug: 'help-ever-hurt-never',
                author_id
            }
        ]

        // Insert seed entries
        return knex(tables.catalogs).insert(data)
    })
}