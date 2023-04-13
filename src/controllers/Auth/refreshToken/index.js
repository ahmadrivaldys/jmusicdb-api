// Importing modules
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res, next) =>
{
    try
    {
        const payload = {
            uuid: req.uuid,
            username: req.username
        }

        const generateToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '10m'
            })

        const generateRefreshToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY_REFRESH,
            {
                expiresIn: '20m'
            })

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully refreshed the token.',
                token: generateToken,
                refreshToken: generateRefreshToken
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = refreshToken