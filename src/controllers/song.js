const { validationResult } = require('express-validator')
const { Song } = require('../../config/models')

const index = async (req, res) =>
{
    try
    {
        const songs = await Song

        res.status(200)
        res.json({
            message: 'Success',
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
        res.status(200)
        res.json({
            message: 'Success',
            data: req.body
        })
    }
    // try
    // {
    //     await Song.insert()
    // }
}

module.exports =
{
    index,
    store
}