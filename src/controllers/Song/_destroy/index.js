// Importing models
const Song = require('../../../models/Song')

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

module.exports = destroy