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
        const error = new Error('Input error.')
        error.errors = errors.mapped()
        throw error
    }
    
    try
    {
        const { username, fullname, email, password } = req.body
        const uuid = uuidv4()

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const accountType = await AccountType.query()
            .where({ category: 'user', category_order: 3 })
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
        // return res.status(422).json({ errors: errors.mapped() })
        const error = new Error('Input error.')
        error.errors = errors.mapped()
        throw error
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
        const blacklistToken = await BlacklistedToken.query()
            .insert({ id: nanoid(8), token: req.verified_token })

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