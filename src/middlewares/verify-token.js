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
    const { authorization: refresh_token, cookie } = headers // Local storage based token: authorization - for refresh token
    const { access_token } = parseCookies(cookie) // Cookie based token: access token

    let secretKey = process.env.JWT_SECRET_KEY // Get the default secret key. The default secret key only used for access_token
    let result = null

    const errorMessage = {
        no_auth: 'Authentication is needed. Please log in.',
        invalid_auth_type: 'Invalid authorization type. Only Bearer authentication is allowed.',
        blacklisted_token: 'Invalid token. Please log in again.',
        token_expired: 'Invalid token: token has expired. Please log in again.',
        logout_no_auth: 'Can\'t log out. You haven\'t logged in for this session yet.',
        logout_blacklisted_token: 'You\'ve logged out before. No need to log out again.',
        logout_token_expired: 'Can\'t log out. Invalid token: token has expired.'
    }

    if(verifyTokenFor === 'logout')
    {
        // No Auth
        if(!access_token || !refresh_token) throwError(errorMessage.logout_no_auth, 401)

        const tokens = [access_token, refresh_token]
        const verifiedTokens = []
        let isBlacklistedTokenExist = false

        tokens.forEach((token, index) =>
        {
            const tokenSplit = token.split(' ')
            const [ tokenType, tokenValue ] = [ tokenSplit[0], tokenSplit[1] ]

            // Invalid Auth Type
            if(tokenType !== 'Bearer') throwError(errorMessage.invalid_auth_type, 401)

            // Blacklisted Token
            BlacklistedToken.query()
                .where('token', tokenValue)
                .orWhere('refresh_token', tokenValue)
                .first()
                .then(blacklistedToken =>
                {
                    console.log(blacklistedToken.id)
                    if(blacklistedToken && blacklistedToken.id !== '')
                    {
                        isBlacklistedTokenExist = true
                        
                    }
                })

            // If current token is refresh token, then use the refresh token secret key
            if(token === refresh_token) secretKey = process.env.JWT_REFRESH_SECRET_KEY

            // JWT Verify
            jwt.verify(tokenValue, secretKey, (err) =>
            {
                if(err)
                {
                    if(err.name === 'TokenExpiredError') throwError(errorMessage.logout_token_expired, 401)
                    
                    console.error('JWT Error:', err.message)
                    throwError(err.message, 401)
                }
            })

            if(token === access_token) verifiedTokens.push({ token: tokenValue })
            if(token === refresh_token) verifiedTokens.push({ refresh_token: tokenValue })
        })

        console.log('isBlacklistedTokenExist:', isBlacklistedTokenExist)
        if(isBlacklistedTokenExist) throwError(errorMessage.logout_blacklisted_token, 401)

        result = verifiedTokens
    }
    else
    {
        let authToken = access_token

        if(verifyTokenFor === 'refresh')
        {
            authToken = refresh_token
            secretKey = process.env.JWT_REFRESH_SECRET_KEY
        }

        // No Auth
        if(!authToken) throwError(errorMessage.no_auth, 401)

        const tokenSplit = authToken.split(' ')
        const [ tokenType, tokenValue ] = [ tokenSplit[0], tokenSplit[1] ]

        // Invalid Auth Type
        if(tokenType !== 'Bearer') throwError(errorMessage.invalid_auth_type, 401)

        const blacklistedToken = await BlacklistedToken.query()
            .where('token', tokenValue)
            .orWhere('refresh_token', tokenValue)
            .first()

        // Blacklisted Token
        if(blacklistedToken) throwError(errorMessage.blacklisted_token, 401)

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

        result = decodedToken
    }

    return result
}

module.exports = verifyToken