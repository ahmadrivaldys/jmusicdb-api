const jwt = require('jsonwebtoken')
const AccountType = require('../models/account_type')
const Admin = require('../models/admin')
const BlacklistedToken = require('../models/blacklisted_token')

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

        const accountType = await AccountType.query()
            .where({ category: 'Admin', category_order: 1 })
            .select('id')
            .first()

        const checkAccount = await Admin.query()
            .where({ uuid: decoded.uuid, username: decoded.username, account_type_id: accountType.id })
            .select('username')
            .withGraphFetched('[account_type(selectAccountType)]')
            .modifiers({
                selectAccountType: builder => builder.select('name')
            })
            .first()
        
        if(!checkAccount)
        {
            const error = new Error('Only admin is allowed.')
            error.statusCode = 401
            throw error
        }

        req.uuid = decoded.uuid
        req.username = decoded.username
    
        next()
    }
    catch(error)
    {
        console.log('Error:', error.message)
        next(error)
    }
}

module.exports = { admin }