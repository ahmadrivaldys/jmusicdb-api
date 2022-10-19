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
            { id: 'AKuI49Si', name: 'Administrator', category: 'admin', category_order: 1 },
            { id: 'X3Pzl3ni', name: 'Editor', category: 'admin', category_order: 2 },
            { id: 'ILdGht3E', name: 'Artist', category: 'user', category_order: 1 },
            { id: 'roNOlwvj', name: 'Subscriber', category: 'user', category_order: 2 },
            { id: '-2E18wpG', name: 'User', category: 'user', category_order: 3 }
        ]

        // Insert seed entries
        return knex(tables.account_types).insert(data)
    })
}