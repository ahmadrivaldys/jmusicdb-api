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
                expiresIn: '5d'
            })

        const generateRefreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            {
                expiresIn: '7d'
            })
        
        // Expires in 5 days
        const tokenExpiration = 5 * 24 * (60 * 60 * 1000)

        return res.status(200)
            .cookie('access_token', `Bearer ${generateToken}`, {
                maxAge: tokenExpiration,
                httpOnly: true
            })
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Successfully refreshed the token.',
                refreshToken: generateRefreshToken,
                accessTokenExpiration: Date.now() + tokenExpiration
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = refreshToken