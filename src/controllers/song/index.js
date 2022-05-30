const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const slugify = require('slugify')
const { Song, knex } = require('../../models/song')

const index = async (req, res, next) =>
{
    try
    {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 5
        
        const songs = await Song.query()
            .select('id', 'title', 'track_no', 'release_date', 'duration', 'slug', 'created_at', 'updated_at')
            .withGraphFetched('[catalog(selectCatalog).type(selectCatalogType), author(selectAuthor)]')
            .modifiers({
                selectCatalog: builder => builder.select('id', 'title as name', 'slug'),
                selectCatalogType: builder => builder.select('name'),
                selectAuthor: builder => builder.select('fullname')
            })
        
        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched all song data.',
                songs,
                totalData: songs.length,
                perPage: parseInt(perPage),
                currentPage: parseInt(currentPage)
            })
    }
    catch(error)
    {
        console.log(error)
        if(!error.statusCode) return res.status(422).json(error)
        next(error)
    }
}

const store = async (req, res, next) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const { title, track_no, catalog_id, artists_id, release_date, duration } = req.body
        const id = nanoid()

        await Song.query()
            .insert({
                id,
                title,
                track_no,
                catalog_id,
                artists_id,
                release_date,
                duration,
                slug: slugify(title, { lower: true }),
                author_id: req.uuid
            })
                                        
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
        if(!error.statusCode) return res.status(422).json(error)
        next(error)
    }
}

const show = async (req, res, next) =>
{
    try
    {
        const song = await Song.query()
            .where('id', req.params.id)
            .select('id', 'title', 'track_no', 'release_date', 'duration', 'slug', 'created_at', 'updated_at')
            .withGraphFetched('[catalog(selectCatalog).type(selectCatalogType), author(selectAuthor)]')
            .modifiers({
                selectCatalog: builder => builder.select('id', 'title as name', 'slug'),
                selectCatalogType: builder => builder.select('name'),
                selectAuthor: builder => builder.select('fullname')
            })
            .first()

        if(!song)
        {
            const error = new Error('Song data not found.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched song data.',
                song
            })
    }
    catch(error)
    {
        console.log(error)
        if(!error.statusCode) return res.status(422).json(error)
        next(error)
    }
}

const update = async (req, res, next) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const { title, track_no, catalog_id, artists_id, release_date, duration } = req.body

        const update = await Song.query()
            .where('id', req.params.id)
            .update({
                title,
                track_no,
                catalog_id,
                artists_id,
                release_date,
                duration,
                slug: slugify(title, { lower: true }),
                updated_at: knex.fn.now()
            })

        if(!update)
        {
            const error = new Error('Update failed: Song data not found.')
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
        if(!error.statusCode) return res.status(422).json(error)
        next(error)
    }
}

const destroy = async (req, res, next) =>
{
    try
    {
        const deleted = await Song.destroy(req.params.id)

        res.status(deleted ? 200 : 404)
        res.json({
            statusCode: deleted ? 200 : 404,
            statusText: deleted ? 'OK' : 'Not Found',
            message: deleted ? 'Successfully deleted song data.' : 'Delete failed: Song data not found.'
        })
    }
    catch(error)
    {
        console.log(error)
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