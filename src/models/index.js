const model = require('./base-model')
const table = require('../../config/tables')

const AccountType = model(table.account_types)
const Admin       = model(table.admin_accounts)
const Album       = model(table.albums)
const Artist      = model(table.artists)
const Blacklist   = model(table.blacklisted_tokens)
const CatalogType = model(table.catalog_types)
const Catalog     = model(table.catalogs)
const Song        = model(table.songs)
const User        = model(table.user_accounts)

module.exports =
{
    AccountType,
    Admin,
    Album,
    Artist,
    Blacklist,
    CatalogType,
    Catalog,
    Song,
    User
}