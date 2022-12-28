// Importing modules
const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const slugify = require('slugify')

// Importing models
const Song = require('../../models/Song')

// Importing utils/helpers
const { getDBCurrentTime } = require('../../utils')

const index = async (req, res, next) =>
{
    try
    {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.per_page) || 10
        
        const totalData = await Song.query()
            .count('id as id')
            .then(count => count[0].id)

        const getAllSongs = await Song.query()
            .select('id', 'title', 'track_no', 'release_date', 'duration', 'slug', 'created_at', 'updated_at')
            .withGraphFetched('[catalog(selectCatalog).type(selectCatalogType), author(selectAuthor)]')
            .modifiers({
                selectCatalog: builder => builder.select('id', 'title as name', 'slug'),
                selectCatalogType: builder => builder.select('name'),
                selectAuthor: builder => builder.select('fullname')
            })
            .offset((currentPage - 1) * perPage)
            .limit(perPage)

        if(!getAllSongs)
        {
            const error = new Error('Song data not found.')
            error.statusCode = 404
            throw error
        }
        
        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched all song data.',
                songs: getAllSongs,
                totalData,
                perPage,
                currentPage
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

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

const show = async (req, res, next) =>
{
    try
    {
        const getSong = await Song.query()
            .where('id', req.params.id)
            .select('id', 'title', 'track_no', 'release_date', 'duration', 'slug', 'created_at', 'updated_at')
            .withGraphFetched('[catalog(selectCatalog).type(selectCatalogType), author(selectAuthor)]')
            .modifiers({
                selectCatalog: builder => builder.select('id', 'title as name', 'slug'),
                selectCatalogType: builder => builder.select('name'),
                selectAuthor: builder => builder.select('fullname')
            })
            .first()

        if(!getSong)
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
                song: getSong
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

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

const destroy = async (req, res, next) =>
{
    try
    {
        const deleteSong = await Song.query()
            .where('id', req.params.id)
            .del()

        if(!deleteSong)
        {
            const error = new Error('Failed to delete song data.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully deleted song data.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
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