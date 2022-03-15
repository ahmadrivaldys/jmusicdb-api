const jwt = require('jsonwebtoken')
const { Blacklist, Admin } = require('../models')

const authenticate = async (req, res) =>
{
    const { authorization } = req.headers

    if(!authorization)
    {
        return res.status(401).send({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Authentication is needed. Please log in.'
        })
    }

    const authSplit = authorization.split(' ')
    const [ authType, authToken ] = [ authSplit[0], authSplit[1] ]

    if(authType !== 'Bearer')
    {
        return res.status(401).send({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid authorization type. Only Bearer authentication is allowed.'
        })
    }

    const checkToken = await Blacklist.where('token', authToken).first()

    if(checkToken)
    {
        return res.status(401).send({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid token. Please log in again.'
        })
    }

    return authToken
}

const admin = async (req, res, next) =>
{
    const verifiedAuthToken = await authenticate(req, res)

    jwt.verify(verifiedAuthToken, process.env.JWT_SECRET_KEY, (err, decoded) =>
    {
        if(err)
        {
            return res.status(401).send({
                statusCode: 401,
                statusMessage: 'Unauthorized',
                message: err
            })
        }

        req.uuid = decoded.uuid
        req.username = decoded.username
    })

    const checkAccount = await Admin.where({ uuid: req.uuid, username: req.username })
                                    .whereIn('account_type_id', [1, 2])
                                    .select('username', 'account_type_id').first()

    if(!checkAccount)
    {
        return res.status(401).send({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Only admin is allowed.'
        })
    }

    next()
}

module.exports = { admin }