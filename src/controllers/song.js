const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const slugify = require('slugify')
const { Song, Catalog } = require('../models')
const tables = require('../../config/tables')

const index = async (req, res) =>
{
    try
    {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 5

        Song
            .fetchAll({
                // withRelated: [{
                //     'author': qb => qb.select('uuid', 'fullname'),
                //     'catalog': qb => qb.select('id', 'title'),
                // }]
                withRelated: ['catalog.type', 'author']
            })
            .then(songs =>
            {
                res.status(200)
                res.json({
                    statusCode: 200,
                    statusMessage: 'OK',
                    message: 'Successfully fetched all song data.',
                    songs,
                    totalData: songs.length,
                    perPage: parseInt(perPage),
                    currentPage: parseInt(currentPage)
                })
            })

        // Catalog
        //     .fetchAll({
        //         withRelated: ['type', 'songs', 'author']
        //     })
        //     .then(catalogs =>
        //     {
        //         res.status(200)
        //         res.json({
        //             statusCode: 200,
        //             statusMessage: 'OK',
        //             message: 'Successfully fetched all catalog data.',
        //             catalogs,
        //             totalData: catalogs.length,
        //             perPage: parseInt(perPage),
        //             currentPage: parseInt(currentPage)
        //         })
        //     })
    }
    catch(error)
    {
        console.log(error)
        res.status(422).json(error)
    }
}

const store = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        res.status(422).json({ errors: errors.mapped() })
    }
    else
    {
        try
        {
            const { title, track_no, catalog_id, artists_id, release_date, duration } = req.body
            const id = nanoid()

            await Song.create({
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
                                          
            res.status(201)
            res.json({
                statusCode: 201,
                statusMessage: 'Created',
                message: 'Successfully created song data.'
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(422).json(error)
        }
    }
}

const show = async (req, res) =>
{
    try
    {
        const songData = await Song.where(`${tables.songs}.id`, req.params.id)
        .join(tables.catalogs, `${tables.catalogs}.id`, `${tables.songs}.catalog_id`)
        .join(tables.catalog_types, `${tables.catalog_types}.id`, `${tables.catalogs}.catalog_type_id`)
        .select(
            `${tables.songs}.id`,
            `${tables.songs}.title`,
            `${tables.songs}.track_no`,
            `${tables.songs}.release_date`,
            `${tables.songs}.duration`,
            `${tables.songs}.slug`,
            `${tables.catalogs}.title AS catalog`,
            `${tables.catalog_types}.name AS catalog_type`,
        )
        .first()

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
        console.log(error)
        res.status(422).json(error)
    }
}

const update = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        res.status(422).json({ errors: errors.mapped() })
    }
    else
    {
        try
        {
            const { title, track_no, catalog_id, artists_id, release_date, duration } = req.body

            const update = await Song.update({
                title,
                track_no,
                catalog_id,
                artists_id,
                release_date,
                duration,
                slug: slugify(title, { lower: true })
            }).where('id', req.params.id)

            res.status(update ? 200 : 404)
            res.json({
                statusCode: update ? 200 : 404,
                statusMessage: update ? 'OK' : 'Not Found',
                message: update ? 'Successfully updated song data.' : 'Update failed: Song data not found.'
            })
        }
        catch(error)
        {
            console.log(error)
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