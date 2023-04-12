// Importing modules
const { validationResult } = require('express-validator')
const slugify = require('slugify')

// Importing models
const Artist = require('../../../models/Artist')

// Importing utils/helpers
const { getDBCurrentTime } = require('../../../utils')

const update = async (req, res, next) =>
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

        const { artist_name: name, description, id } = req.body
        const photo = req.file && req.file.filename
        let updateData = {
            name,
            description,
            slug: slugify(name, { lower: true }),
            updated_at: getDBCurrentTime()
        }

        if(req.file) updateData.photo = photo

        const updateArtist = await Artist.query()
            .where('id', id)
            .update(updateData)

        if(!updateArtist)
        {
            const error = new Error('Failed to update artist data.')
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully updated artist data.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = update