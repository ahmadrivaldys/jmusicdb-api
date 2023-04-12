// Importing models
const Song = require('../../../models/Song')

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

module.exports = show