const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { nanoid } = require('nanoid')
const { Admin } = require('../../models/admin')

const login = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const getAccount = await Admin.query()
            .where('username', req.body.username)
            .first()

        const generateToken = jwt.sign({
                uuid: getAccount.uuid,
                username: getAccount.username
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            })

        return res.status(200)
            .json({
                statusCode: 200,
                statusMessage: 'OK',
                message: 'Log in successful.',
                token: generateToken
            })
    }
    catch(error)
    {
        console.log(error)
        return res.status(422).json(error)
    }
}

const logout = async (req, res) =>
{
    try
    {
        const { authorization } = req.headers

        if(!authorization)
        {
            return res.status(422).json({
                statusCode: 422,
                statusMessage: 'Unprocessable Entity',
                message: 'Can\'t log out. You haven\'t logged in for this session yet.'
            })
        }

        const authSplit = authorization.split(' ')
        const [ authType, authToken ] = [ authSplit[0], authSplit[1] ]

        if(authType !== 'Bearer')
        {
            return res.status(422).send({
                statusCode: 422,
                statusMessage: 'Unprocessable Entity',
                message: 'Invalid authorization type. Only Bearer authentication is allowed.'
            })
        }

        const checkToken = await Blacklist.where('token', authToken).first()

        if(checkToken)
        {
            return res.status(422).send({
                statusCode: 422,
                statusMessage: 'Unprocessable Entity',
                message: 'You\'ve logged out before. No need to log out again.'
            })
        }

        await Blacklist.create({ id: nanoid(8), token: authToken })

        res.status(200)
        res.json({
            statusCode: 200,
            statusMessage: 'OK',
            message: 'Log out successful.'
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(422).json(error)
    }
}

module.exports = { login, logout }