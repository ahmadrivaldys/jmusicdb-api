const tables = require('../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.account_types).del().then(function()
    {
        // Data
        data =
        [
            { name: 'Administrator', category: 'Admin', category_order: 1, order: 1 },
            { name: 'Editor', category: 'Admin', category_order: 2, order: 2 },
            { name: 'Artist', category: 'User', category_order: 1, order: 3 },
            { name: 'Subscriber', category: 'User', category_order: 2, order: 4 },
            { name: 'User', category: 'User', category_order: 3, order: 5 }
        ]

        // Insert seed entries
        return knex(tables.account_types).insert(data)
    })
}