// Importing modules
const { nanoid } = require('nanoid')

// Importing models
const BlacklistedToken = require('../../../models/BlacklistedToken')

const logout = async (req, res, next) =>
{
    try
    {
        const blacklistToken = await BlacklistedToken.query()
            .insert({ id: nanoid(8), token: req.verified_token, refresh_token: req.verified_refresh_token })

        if(!blacklistToken)
        {
            const error = new Error('Log out failed.')
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Log out successful.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = logout