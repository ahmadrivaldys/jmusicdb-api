const tables = require('../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.account_types).del().then(function()
    {
        // Data
        data =
        [
            { name: 'Administrator', order: 1 },
            { name: 'Editor', order: 2 },
            { name: 'Artist', order: 3 },
            { name: 'Subscriber', order: 4 },
            { name: 'User', order: 5 }
        ]

        // Insert seed entries
        return knex(tables.account_types).insert(data)
    })
}