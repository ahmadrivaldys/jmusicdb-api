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
            const create = await Song.create(req.body)
            const createdData = await Song.findById(create)

            res.status(201)
            res.json({
                statusCode: 201,
                statusMessage: 'Created',
                message: 'Successfully created song data.',
                data: createdData
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
        const songData = await Song.findById(req.params.id)

        res.status(songData ? 200 : 404)
        res.json({
            statusCode: songData ? 200 : 404,
            statusMessage: songData ? 'OK' : 'Not Found',
            message: songData ? 'Successfully fetched song data.' : 'Song data not found.',
            data: songData ? songData : '-'
        })
    }
    catch(error)
    {
        res.status(422).json(error)
    }
}

const update = async (req, res) =>
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
            const update = await Song.update(req.body).where('id', req.params.id)
            const updatedData = await Song.findById(req.params.id)

            res.status(update ? 200 : 404)
            res.json({
                statusCode: update ? 200 : 404,
                statusMessage: update ? 'OK' : 'Not Found',
                message: update ? 'Successfully updated song data.' : 'Update failed: Song data not found.',
                data: update ? updatedData : '-'
            })
        }
        catch(error)
        {
            res.status(422).json(error)
        }
    }
}

const destroy = async (req, res) =>
{
    try
    {
        const deleted = await Song.destroy(req.params.id)

        res.status(deleted ? 200 : 404)
        res.json({
            statusCode: deleted ? 200 : 404,
            statusMessage: deleted ? 'OK' : 'Not Found',
            message: deleted ? 'Successfully deleted song data.' : 'Delete failed: Song data not found.'
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
    show,
    update,
    destroy
}