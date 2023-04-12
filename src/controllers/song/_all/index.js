// Importing models
const Song = require('../../../models/Song')

const all = async (req, res, next) =>
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

module.exports = all