// Importing modules
const { validationResult } = require('express-validator')
const slugify = require('slugify')

// Importing models
const Song = require('../../../models/Song')

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

        const { title, track_no, catalog_id, main_artists_id, featuring_artists_id, release_date, minutes, seconds } = req.body
        const mins = minutes.toString()
        const secs = seconds.toString()
        const duration = `${mins.length < 2 ? '0' + mins : mins}:${secs.length < 2 ? '0' + secs : secs}`

        const updateSong = await Song.query()
            .where('id', req.params.id)
            .update({
                title,
                track_no,
                catalog_id,
                main_artists_id,
                featuring_artists_id,
                release_date,
                duration,
                slug: slugify(title, { lower: true }),
                updated_at: getDBCurrentTime()
            })

        if(!updateSong)
        {
            const error = new Error('Failed to update song data.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully updated song data.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = update