const tables = require('../../../config/tables')
const { nanoid } = require('nanoid')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.account_types).del().then(function()
    {
        // Data
        data =
        [
            { id: 1, code: nanoid(8), name: 'Administrator', category: 'Admin', category_order: 1 },
            { id: 2, code: nanoid(8), name: 'Editor', category: 'Admin', category_order: 2 },
            { id: 3, code: nanoid(8), name: 'Artist', category: 'User', category_order: 1 },
            { id: 4, code: nanoid(8), name: 'Subscriber', category: 'User', category_order: 2 },
            { id: 5, code: nanoid(8), name: 'User', category: 'User', category_order: 3 }
        ]

        // Insert seed entries
        return knex(tables.account_types).insert(data)
    })
}