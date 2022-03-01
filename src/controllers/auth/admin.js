const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { Admin, Blacklist } = require('../../models')
require('dotenv').config()

const login = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        res.status(422).json(errors)
    }
    else
    {
        try
        {
            const response = (message) =>
            {
                res.status(401).json({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
                    message
                })
            }
            
            const checkUser = await Admin.where('username', req.body.username).first()
            if(!checkUser) return response('There is no account with that username.')

            const checkPassword = await bcrypt.compare(req.body.password, checkUser.password)
            if(!checkPassword) return response('Incorrect password.')

            const token = jwt.sign({
                id: checkUser.id,
                username: checkUser.username
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            })

            res.status(200)
            res.json({
                statusCode: 200,
                statusMessage: 'OK',
                message: 'Log in successful.',
                token
            })
        }
        catch(error)
        {
            res.status(422).json(error)
        }
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
                message: 'Can\'t log out. You haven\'t logged in for this session yet'
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

        await Blacklist.create({ token: authToken })

        res.status(200)
        res.json({
            statusCode: 200,
            statusMessage: 'OK',
            message: 'Log out successful.'
        })
    }
    catch(error)
    {
        res.status(422).json(error)
    }
}

module.exports = { login, logout }