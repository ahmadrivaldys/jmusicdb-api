const tables = require('../../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.songs).del().then(function()
    {
        const author_id = '6cad46ed-7480-4baa-bddf-9a80de4e4e68' // UUID

        // Data
        data =
        [
            {
                id: '8fFivDvas9zYNulWQO608', // Nano ID (21)
                title: 'Odoriko',
                track_no: 1,
                catalog_id: 'mzIq5afcEuITkbOngIo6-',
                main_artists_id: 1,
                release_date: '2022-10-23',
                duration: '3:50',
                slug: 'odoriko',
                author_id
            },
            {
                id: 'jUcUn1tYb2xrOWgAjioqa',
                title: 'Tabiji',
                track_no: 2,
                catalog_id: 'RXZvJIn_SJ8kMIf2eNFjS',
                main_artists_id: 2,
                release_date: '2022-10-23',
                duration: '4:37',
                slug: 'tabiji',
                author_id
            },
            {
                id: 'zocyxmR0TzrWHPK35RTWu',
                title: 'Kirari',
                track_no: 2,
                catalog_id: 'tleDyUOMOfkVZzW8WCtC0',
                main_artists_id: 3,
                release_date: '2022-10-23',
                duration: '3:51',
                slug: 'kirari',
                author_id
            }
        ]

        // Insert seed entries
        return knex(tables.songs).insert(data)
    })
}