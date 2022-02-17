const model = require('./base-model')
const table = require('../../config/tables')

const Album  = model(table.albums)
const Artist = model(table.artists)
const Song   = model(table.songs)

module.exports =
{
    Album,
    Artist,
    Song
}