const database = require('./database')
const table    = require('./tables')

const Album  = database(table.albums)
const Artist = database(table.artists)
const Song   = database(table.songs)

module.exports =
{
    Album,
    Artist,
    Song
}