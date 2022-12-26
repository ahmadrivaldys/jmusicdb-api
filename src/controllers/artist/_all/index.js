// Importing models
const Artist = require('../../../models/artist')

const all = async (req, res, next) =>
{
    try
    {
        const currentPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.per_page) || 10

        const totalData = await Artist.query()
            .count('id as id')
            .then(count => count[0].id)
        
        const getAllArtists = await Artist.query()
            .select('id', 'name', 'slug', 'photo', 'description', 'created_at', 'updated_at')
            .withGraphFetched('[author(selectAuthor)]')
            .modifiers({
                selectAuthor: builder => builder.select('fullname')
            })
            .offset((currentPage - 1) * perPage)
            .limit(perPage)

        if(!getAllArtists)
        {
            const error = new Error('Artist data not found.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched all artist data.',
                artists: getAllArtists,
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