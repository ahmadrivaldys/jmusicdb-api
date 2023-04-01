// Importing models
const Artist = require('../../../models/Artist')

const show = async (req, res, next) =>
{
    try
    {
        const getArtist = await Artist.query()
            .where('id', req.params.id)
            .select('id', 'name', 'photo', 'description', 'created_at', 'updated_at')
            .withGraphFetched('[author(selectAuthor)]')
            .modifiers({
                selectAuthor: builder => builder.select('fullname')
            })
            .first()

        if(!getArtist)
        {
            const error = new Error('Artist data not found.')
            error.statusCode = 404
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully fetched artist data.',
                artist: getArtist
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = show