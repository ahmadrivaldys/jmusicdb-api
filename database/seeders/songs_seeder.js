const tables = require('../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.songs).del().then(function()
    {
        // Data
        data =
        [
            {
                id: 1,
                title: 'Odoriko',
                album_id: 1,
                artists_id: 1,
                duration: '3:50',
                slug: '-',
                author_id: 1
            },
            {
                id: 2,
                title: 'Tabiji',
                album_id: 1,
                artists_id: 2,
                duration: '4:37',
                slug: '-',
                author_id: 1
            },
            {
                id: 3,
                title: 'Kirari',
                album_id: 1,
                artists_id: 2,
                duration: '3:51',
                slug: '-',
                author_id: 1
            }
        ]

        // Insert seed entries
        return knex(tables.songs).insert(data)
    })
}