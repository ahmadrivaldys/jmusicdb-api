const jwt = require('jsonwebtoken')
const { Admin } = require('../models/admin')
const { BlacklistedToken } = require('../models/blacklisted_token')

const authenticate = async (headers) =>
{
    const { authorization } = headers

    if(!authorization)
    {
        const error = new Error('Authentication is needed. Please log in.')
        error.statusCode = 401
        throw error
    }

    const authSplit = authorization.split(' ')
    const [ authType, authToken ] = [ authSplit[0], authSplit[1] ]

    if(authType !== 'Bearer')
    {
        const error = new Error('Invalid authorization type. Only Bearer authentication is allowed.')
        error.statusCode = 401
        throw error
    }

    const checkToken = await BlacklistedToken.query()
        .where('token', authToken)
        .first()

    if(checkToken)
    {
        const error = new Error('Invalid token. Please log in again.')
        error.statusCode = 401
        throw error
    }

    const verifyToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) =>
        {
            if(err)
            {
                if(err.name === 'TokenExpiredError')
                {
                    const error = new Error('Invalid token: token has expired. Please log in again.')
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

const admin = async (req, res, next) =>
{
    try
    {
        const decoded = await authenticate(req.headers)

        req.uuid = decoded.uuid
        req.username = decoded.username

        const checkAccount = await Admin.query()
            .where({ uuid: decoded.uuid, username: decoded.username, account_type_id: 1 })
            .select('username', 'account_type_id')
            .first()
        
        if(!checkAccount)
        {
            const error = new Error('Only admin is allowed. [THROW]')
            error.statusCode = 401
            throw error
        }
    
        next()
    }
    catch(error)
    {
        console.log('Error:', error.message)
        next(error)
    }
}

module.exports = { admin }