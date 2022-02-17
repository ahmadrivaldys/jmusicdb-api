const { validationResult } = require('express-validator')
const { Song } = require('../models')

const index = async (req, res) =>
{
    try
    {
        const songs = await Song.all()

        res.status(200)
        res.json({
            statusCode: 200,
            statusMessage: 'OK',
            message: 'Successfully fetched all song data.',
            data: songs
        })
    }
    catch(error)
    {
        res.status(422).json(error)
    }
}

const store = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        res.status(422).json(errors)
    }
    else
    {
        try
        {
            await Song.create(req.body)

            res.status(201)
            res.json({
                statusCode: 201,
                statusMessage: 'Created',
                message: 'Successfully created song data.'
            })
        }
        catch(error)
        {
            res.status(422).json(error)
        }
    }
}

const show = async (req, res) =>
{
    try
    {
        const songs = await Song.findById(req.params.id)

        res.status(songs.length > 0 ? 200 : 404)
        res.json({
            statusCode: songs.length > 0 ? 200 : 404,
            statusMessage: songs.length > 0 ? 'OK' : 'Not Found',
            message: songs.length > 0 ? 'Successfully fetched song data.' : 'Song data not found.',
            data: songs.length > 0 ? songs[0] : '-'
        })
    }
    catch(error)
    {
        res.status(422).json(error)
    }
}

module.exports =
{
    index,
    store,
    show
}