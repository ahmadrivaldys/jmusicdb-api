const jwt = require('jsonwebtoken')
const BlacklistedToken = require('../models/blacklisted_token')

/**
 * Token Verification
 * 
 * @param {*} headers 
 * @param {string} tokenVerifyFor 
 * @returns verified token
 */
const tokenVerification = async (headers, tokenVerifyFor) =>
{
    const { authorization } = headers

    // No Auth
    if(!authorization)
    {
        let resMessage = 'Authentication is needed. Please log in.'
        if(tokenVerifyFor === 'logout') resMessage = 'Can\'t log out. You haven\'t logged in for this session yet.'

        const error = new Error(resMessage)
        error.statusCode = 401
        throw error
    }

    const authSplit = authorization.split(' ')
    const [ authType, authToken ] = [ authSplit[0], authSplit[1] ]

    // Invalid Auth Type
    if(authType !== 'Bearer')
    {
        const error = new Error('Invalid authorization type. Only Bearer authentication is allowed.')
        error.statusCode = 401
        throw error
    }

    const checkToken = await BlacklistedToken.query()
        .where('token', authToken)
        .first()

    // Blacklisted Token
    if(checkToken)
    {
        let resMessage = 'Invalid token. Please log in again.'
        if(tokenVerifyFor === 'logout') resMessage = 'You\'ve logged out before. No need to log out again.'

        const error = new Error(resMessage)
        error.statusCode = 401
        throw error
    }

    // JWT Verify
    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) =>
    {
        if(err)
        {
            if(err.name === 'TokenExpiredError')
            {
                let resMessage = 'Invalid token: token has expired. Please log in again.'
                if(tokenVerifyFor === 'logout') resMessage = 'Can\'t log out. Invalid token: token has expired.'

                const error = new Error(resMessage)
                error.statusCode = 401
                throw error
            }
            
            console.error('JWT Error:', err.message)
            const error = new Error(err.message)
            error.statusCode = 401
            throw error
        }

        return decoded
    })

    return verifyToken
}

module.exports = tokenVerification