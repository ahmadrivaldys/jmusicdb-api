const tables = require('../../../config/tables')

exports.seed = function(knex)
{
    // Deletes all existing entries
    return knex(tables.catalogs_main_artists).del().then(function()
    {
        // Data
        data =
        [
            {
                catalog_id: 'mzIq5afcEuITkbOngIo6-', // Nano ID (21)
                artist_id: 'uWboZ-7ZMsNkWdu1HZe3O' // Nano ID (21)
            },
            {
                catalog_id: 'RXZvJIn_SJ8kMIf2eNFjS',
                artist_id: 'mVipICnMLk3poUSKXX312'
            },
            {
                catalog_id: 'RXZvJIn_SJ8kMIf2eNFjS',
                artist_id: 'uWboZ-7ZMsNkWdu1HZe3O'
            },
            {
                catalog_id: 'tleDyUOMOfkVZzW8WCtC0',
                artist_id: 'mVipICnMLk3poUSKXX312'
            },
            {
                catalog_id: 'tleDyUOMOfkVZzW8WCtC0',
                artist_id: 'F-ndBwTGFk7zgwB_FM7ha'
            }
        ]

        // Insert seed entries
        return knex(tables.catalogs_main_artists).insert(data)
    })
}