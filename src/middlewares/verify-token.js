const jwt = require('jsonwebtoken')
const BlacklistedToken = require('../models/BlacklistedToken')
const { parseCookies, throwError } = require('../utils')

/**
 * Verify Token
 * 
 * @param {*} headers 
 * @param {string} verifyTokenFor 
 * @returns decoded or verified tokens
 */
const verifyToken = async (headers, verifyTokenFor) =>
{
    const { authorization, cookie } = headers // Local storage based token: authorization - for refresh token
    const { access_token } = parseCookies(cookie) // Cookie based token: access token

    const errorMessage = {
        no_auth: 'Authentication is needed. Please log in.',
        invalid_auth_type: 'Invalid authorization type. Only Bearer authentication is allowed.',
        blacklisted_token: 'Invalid token. Please log in again.',
        token_expired: 'Invalid token: token has expired. Please log in again.',
        logout_no_auth: 'Can\'t log out. You haven\'t logged in for this session yet.',
        logout_blacklisted_token: 'You\'ve logged out before. No need to log out again.',
        logout_token_expired: 'Can\'t log out. Invalid token: token has expired.'
    }

    let verifiedTokens = null

    if(verifyTokenFor === 'logout')
    {
        // No Auth
        if(!access_token || !authorization) throwError(errorMessage.logout_no_auth, 401)

        const tokens = [access_token, authorization]
        const authTokens = {}

        tokens.forEach(async token =>
        {
            const tokenSplit = token.split(' ')
            const [ tokenType, tokenValue ] = [ tokenSplit[0], tokenSplit[1] ]

            // Invalid Auth Type
            if(tokenType !== 'Bearer') throwError(errorMessage.invalid_auth_type, 401)

            const checkToken = await BlacklistedToken.query()
                .where('token', tokenValue)
                .orWhere('refresh_token', tokenValue)
                .first()

            // Blacklisted Token
            if(checkToken) throwError(errorMessage.logout_blacklisted_token, 401)

            const secretKey = token === authorization ? process.env.JWT_REFRESH_SECRET_KEY : process.env.JWT_SECRET_KEY

            // JWT Verify
            jwt.verify(tokenValue, secretKey, (err, decoded) =>
            {
                if(err)
                {
                    if(err.name === 'TokenExpiredError') throwError(errorMessage.logout_token_expired, 401)
                    
                    console.error('JWT Error:', err.message)
                    throwError(err.message, 401)
                }
            })

            authTokens[token === access_token ? 'token' : 'refresh_token'] = tokenValue
        })

        verifiedTokens = authTokens
    }
    else
    {
        let authToken = access_token
        let secretKey = process.env.JWT_SECRET_KEY

        if(verifyTokenFor === 'refresh')
        {
            authToken = authorization
            secretKey = process.env.JWT_REFRESH_SECRET_KEY
        }

        // No Auth
        if(!authToken) throwError(errorMessage.no_auth, 401)

        const tokenSplit = authToken.split(' ')
        const [ tokenType, tokenValue ] = [ tokenSplit[0], tokenSplit[1] ]

        // Invalid Auth Type
        if(tokenType !== 'Bearer') throwError(errorMessage.invalid_auth_type, 401)

        const checkToken = await BlacklistedToken.query()
            .where('token', tokenValue)
            .orWhere('refresh_token', tokenValue)
            .first()

        // Blacklisted Token
        if(checkToken) throwError(errorMessage.blacklisted_token, 401)

        // JWT Verify
        const decodedToken = jwt.verify(tokenValue, secretKey, (err, decoded) =>
        {
            if(err)
            {
                if(err.name === 'TokenExpiredError') throwError(errorMessage.token_expired, 401)
                
                console.error('JWT Error:', err.message)
                throwError(err.message, 401)
            }

            return decoded
        })

        verifiedTokens = decodedToken
    }

    return verifiedTokens
}

module.exports = verifyToken