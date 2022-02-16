const { validationResult } = require('express-validator')
const { Song } = require('../../config/models')

const index = async (req, res) =>
{
    try
    {
        const songs = await Song

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
            await Song.insert(req.body)

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
        const songs = await Song.where('id', req.params.id).select()

        res.status(200)
        res.json({
            statusCode: 200,
            statusMessage: 'OK',
            message: 'Successfully fetched song data.',
            data: songs[0]
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