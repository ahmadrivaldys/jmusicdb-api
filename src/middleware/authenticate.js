const jwt = require('jsonwebtoken')
const { Blacklist } = require('../models')

const authenticate = async (req, res, next) =>
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

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err) =>
    {
        if(err)
        {
            return res.status(500).send({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                message: err
            })
        }

        next()
    })
}

module.exports = authenticate