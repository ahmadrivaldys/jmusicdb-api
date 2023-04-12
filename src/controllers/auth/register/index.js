// Importing modules
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { validationResult } = require('express-validator')

// Importing models
const AccountType = require('../../models/AccountType')
const User = require('../../models/User')

const register = async (req, res, next) =>
{
    try
    {
        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            const error = new Error('Input error.')
            error.errors = errors.mapped()
            throw error
        }

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

module.exports = register