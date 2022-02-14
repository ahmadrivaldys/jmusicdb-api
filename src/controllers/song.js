const { Song } = require('../../config/models')

const index = async (req, res) =>
{
    try
    {
        const songs = await Song

        res.status(200)
        res.json({
            message: 'Success',
            data: songs
        })
    }
    catch(error)
    {
        res.status(422).json(error)
    }
}

module.exports =
{
    index
}