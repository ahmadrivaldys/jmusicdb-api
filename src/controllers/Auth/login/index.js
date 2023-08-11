// Importing modules
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

// Importing utils/helpers
const { getAccount } = require('../../../utils')

const login = async (req, res, next) =>
{
    try
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            const error = new Error('Input error.')
            error.errors = errors.mapped()
            throw error
        }

        const account = await getAccount(req.query.account_type, { username: req.body.username })
        
        const payload = {
            uuid: account.uuid,
            username: account.username
        }

        const generateToken = jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '3d'
            })

        const generateRefreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            {
                expiresIn: '5d'
            })

        // Expires in 3 days
        const tokenExpiration = 3 * 24 * (60 * 60 * 1000)

        return res.status(200)
            .cookie('access_token', `Bearer ${generateToken}`, {
                maxAge: tokenExpiration,
                httpOnly: true
            })
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Log in successful.',
                refreshToken: generateRefreshToken,
                accessTokenExpiration: Date.now() + tokenExpiration,
                loggedInUser:
                {
                    fullname: account.fullname,
                    photo: account.photo,
                    account_type: account.account_type.name
                }
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = login