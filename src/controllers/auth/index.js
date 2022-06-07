// Importing modules
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const { v4: uuidv4 } = require('uuid')
const { validationResult } = require('express-validator')

// Importing models
const AccountType = require('../../models/account_type')
const BlacklistedToken = require('../../models/blacklisted_token')
const User = require('../../models/user')

const getAccount = require('../../utils/get-account')

const register = async (req, res, next) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.mapped() })
    }
    
    try
    {
        const { username, fullname, email, password } = req.body
        const uuid = uuidv4()

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const accountType = await AccountType.query()
            .where({ category: 'User', category_order: 3 })
            .select('id')
            .first()

        const createAccount = await User.query()
            .insert({
                uuid,
                username,
                fullname,
                email,
                password: passwordHash,
                account_type_id: accountType.id
            })

        if(!createAccount)
        {
            const error = new Error('Failed to register account.')
            throw error
        }

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
        const account = await getAccount(req.query.account_type, { username: req.body.username })

        const generateToken = jwt.sign({
                uuid: account.uuid,
                username: account.username
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

const logout = async (req, res, next) =>
{
    try
    {
        const { authorization } = req.headers

        if(!authorization)
        {
            const error = new Error('Can\'t log out. You haven\'t logged in for this session yet')
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
            const error = new Error('You\'ve logged out before. No need to log out again.')
            error.statusCode = 401
            throw error
        }

        const blacklistToken = await BlacklistedToken.query()
            .insert({ id: nanoid(8), token: authToken })

        if(!blacklistToken)
        {
            const error = new Error('Log out failed.')
            throw error
        }

        return res.status(200)
            .json({
                statusCode: 200,
                statusText: 'OK',
                message: 'Log out successful.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = { register, login, logout }