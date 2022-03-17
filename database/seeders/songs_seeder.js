const tables = require('../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.songs).del().then(function()
    {
        const author_id = 'a6e40b9f-98af-4871-bb52-bafd12c65d3b' // UUID

        // Data
        data =
        [
            {
                id: '8fFivDvas9zYNulWQO608', // Nano ID (21)
                title: 'Odoriko',
                album_id: 1,
                artists_id: 1,
                duration: '3:50',
                slug: '-',
                author_id
            },
            {
                id: 'jUcUn1tYb2xrOWgAjioqa',
                title: 'Tabiji',
                album_id: 1,
                artists_id: 2,
                duration: '4:37',
                slug: '-',
                author_id
            },
            {
                id: 'zocyxmR0TzrWHPK35RTWu',
                title: 'Kirari',
                album_id: 1,
                artists_id: 2,
                duration: '3:51',
                slug: '-',
                author_id
            }
        ]

        // Insert seed entries
        return knex(tables.songs).insert(data)
    })
}