// Importing modules
const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const slugify = require('slugify')

// Importing models
const Artist = require('../../../models/artist')

const store = async (req, res, next) =>
{
    try
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            const error = new Error('Input error.')
            error.errors = errors.mapped()
            throw error
        }

        if(!req.file)
        {
            const error = new Error('Input error.')
            error.errors = {
                photo:
                {
                    location: 'body',
                    msg: 'Photo is required.',
                    param: 'photo',
                    value: '',
                }
            }
            throw error
        }

        const { artist_name: name, description } = req.body
        const id = nanoid()
        const photo = req.file.filename

        const createArtist = await Artist.query()
            .insert({
                id,
                name,
                description,
                photo,
                slug: slugify(name, { lower: true }),
                author_id: req.uuid
            })

        if(!createArtist)
        {
            const error = new Error('Failed to create artist data.')
            throw error
        }

        return res.status(201)
            .json({
                statusCode: 201,
                statusText: 'Created',
                message: 'Successfully created artist data.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = store