const model = require('./base-model')
const table = require('../../config/tables')

const Admin     = model(table.admin_accounts)
const Album     = model(table.albums)
const Artist    = model(table.artists)
const Blacklist = model(table.blacklisted_tokens)
const Song      = model(table.songs)
const User      = model(table.user_accounts)

module.exports =
{
    Admin,
    Album,
    Artist,
    Blacklist,
    Song,
    User
}