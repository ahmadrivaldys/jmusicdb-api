const tables = require('../../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.artists).del().then(function()
    {
        const author_id = '6cad46ed-7480-4baa-bddf-9a80de4e4e68' // UUID

        // Data
        data =
        [
            {
                id: 'F-ndBwTGFk7zgwB_FM7ha', // Nano ID (21)
                name: 'ONE OK ROCK',
                description: '',
                photo: '',
                slug: 'one-ok-rock',
                author_id
            },
            {
                id: 'uWboZ-7ZMsNkWdu1HZe3O',
                name: 'Vaundy',
                description: '',
                photo: '',
                slug: 'vaundy',
                author_id
            },
            {
                id: 'mVipICnMLk3poUSKXX312',
                name: 'Fujii Kaze',
                description: '',
                photo: '',
                slug: 'fujii-kaze',
                author_id
            }
        ]

        // Insert seed entries
        return knex(tables.artists).insert(data)
    })
}