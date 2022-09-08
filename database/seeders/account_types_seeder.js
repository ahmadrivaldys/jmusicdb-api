const tables = require('../../config/tables')
const { nanoid } = require('nanoid')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.account_types).del().then(function()
    {
        // Data
        data =
        [
            { id: nanoid(8), role: 'Administrator', category: 'admin', category_order: 1 },
            { id: nanoid(8), role: 'Editor', category: 'admin', category_order: 2 },
            { id: nanoid(8), role: 'Artist', category: 'user', category_order: 1 },
            { id: nanoid(8), role: 'Subscriber', category: 'user', category_order: 2 },
            { id: nanoid(8), role: 'User', category: 'user', category_order: 3 }
        ]

        // Insert seed entries
        return knex(tables.account_types).insert(data)
    })
}