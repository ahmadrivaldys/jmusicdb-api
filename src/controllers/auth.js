const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { Admin } = require('../models')
require('dotenv').config()

const register = async (req, res) =>
{
    // 
}

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
                res.status(422).json({
                    statusCode: 422,
                    statusMessage: 'Unprocessable Entity',
                    message
                })
            }
            
            const checkUser = await Admin.where('username', req.body.username).first()
            if(!checkUser) return response('Username not found.')

            const checkPassword = await bcrypt.compare(req.body.password, checkUser.password)
            if(!checkPassword) return response('Password incorrect.')

            const token = jwt.sign({
                id: checkUser.id,
                email: checkUser.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            })

            res.status(200)
            res.json({
                statusCode: 200,
                statusMessage: 'OK',
                message: 'Login successful.',
                token
            })
        }
        catch(error)
        {
            res.status(422).json(error)
        }
    }
}

module.exports =
{
    register,
    login
}