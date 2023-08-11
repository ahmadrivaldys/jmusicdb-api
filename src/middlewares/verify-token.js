const jwt = require('jsonwebtoken')
const BlacklistedToken = require('../models/BlacklistedToken')
const { parseCookies, throwError } = require('../utils')
const { errorMessage } = require('../utils/constants')

/**
 * Verify Token
 * 
 * @param {*} headers 
 * @param {string} method 
 * @returns decoded or verified tokens
 */
const verifyToken = async (headers, method) =>
{
    const { authorization: refresh_token, cookie } = headers // Local storage based token: authorization - for refresh token
    const { access_token } = parseCookies(cookie) // Cookie based token: access token

    if(method === 'remove')
    {
        // No Auth
        if(!access_token || !refresh_token) throwError(errorMessage.LOGOUT.NO_AUTH, 401)

        const accessToken  = await verify({
            token: access_token,
            secretKey: process.env.JWT_SECRET_KEY,
            method: 'remove'
        })

        const refreshToken = await verify({
            token: refresh_token,
            secretKey: process.env.JWT_REFRESH_SECRET_KEY,
            method: 'remove'
        })

        return {
            accessToken,
            refreshToken
        }
    }

    if(method === 'refresh')
    {
        // No Auth
        if(!refresh_token) throwError(errorMessage.ACCESS.NO_AUTH, 401)

        const data = await verify({
            token: refresh_token,
            secretKey: process.env.JWT_REFRESH_SECRET_KEY,
            method: 'refresh'
        })

        return data
    }

    // No Auth
    if(!access_token) throwError(errorMessage.ACCESS.NO_AUTH, 401)

    const data = await verify({
        token: access_token,
        secretKey: process.env.JWT_SECRET_KEY,
        method: 'read'
    })

    return data
}


const verify = async ({ token, secretKey, method }) =>
{
    const accessType = method === 'remove' ? 'LOGOUT' : 'ACCESS'
    const { BLACKLISTED_TOKEN, TOKEN_EXPIRED } = errorMessage[accessType]

    const tokenSplit = token.split(' ')
    const [ tokenType, tokenValue ] = [ tokenSplit[0], tokenSplit[1] ]

    // Invalid Auth Type
    if(tokenType !== 'Bearer') throwError(errorMessage.ACCESS.INVALID_AUTH_TYPE, 401)

    const blacklistedToken = await BlacklistedToken.query()
        .where('token', tokenValue)
        .orWhere('refresh_token', tokenValue)
        .first()

    // Blacklisted Token
    if(blacklistedToken) throwError(BLACKLISTED_TOKEN, 401)

    // JWT Verify
    const decodedToken = jwt.verify(tokenValue, secretKey, (err, decoded) =>
    {
        if(err)
        {
            if(err.name === 'TokenExpiredError') throwError(TOKEN_EXPIRED, 401)
            
            console.error('JWT Error:', err.message)
            throwError(err.message, 401)
        }

        return decoded
    })

    return method !== 'remove' ? decodedToken : tokenValue
}

module.exports = verifyToken