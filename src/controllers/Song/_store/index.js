// Importing modules
const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const slugify = require('slugify')

// Importing models
const Song = require('../../../models/Song')

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

        const { title, track_no, catalog_id, main_artists_id, featuring_artists_id, release_date, minutes, seconds } = req.body
        const id = nanoid()
        const mins = minutes.toString()
        const secs = seconds.toString()
        const duration = `${mins.length < 2 ? '0' + mins : mins}:${secs.length < 2 ? '0' + secs : secs}`

        const createSong = await Song.query()
            .insert({
                id,
                title,
                track_no,
                catalog_id,
                main_artists_id,
                featuring_artists_id,
                release_date,
                duration,
                slug: slugify(title, { lower: true }),
                author_id: req.uuid
            })

        if(!createSong)
        {
            const error = new Error('Failed to create song data.')
            throw error
        }
                                        
        return res.status(201)
            .json({
                statusCode: 201,
                statusText: 'Created',
                message: 'Successfully created song data.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = store