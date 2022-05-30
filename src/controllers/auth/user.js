const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const AccountType = require('../../models/account_type')
const User = require('../../models/user')

const register = async (req, res, next) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const { username, fullname, email, password, account_type_code } = req.body
        const uuid = uuidv4()

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const accountType = await AccountType.query()
            .where('code', account_type_code)
            .select('id')
            .first()

        await User.query()
            .insert({
                uuid,
                username,
                fullname,
                email,
                password: passwordHash,
                account_type_id: accountType.id
            })

        return res.status(201)
            .json({
                statusCode: 201,
                statusText: 'Created',
                message: 'Successfully created user account.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

const login = async (req, res, next) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const getAccount = await User.query()
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
                statusText: 'OK',
                message: 'Log in successful.',
                token: generateToken
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
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
        console.log(error)
        res.status(422).json(error)
    }
}

module.exports = { register, login, logout }