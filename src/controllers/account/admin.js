// Importing modules
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { validationResult } = require('express-validator')

// Importing models
const AccountType = require('../../models/AccountType')
const Admin = require('../../models/Admin')

const index = async (req, res) =>
{
    // 
}

const store = async (req, res, next) =>
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

        const { username, fullname, email, password, account_type_id } = req.body
        const uuid = uuidv4()

        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const accountType = await AccountType.query()
            .where({ id: account_type_id, category: 'admin' })
            .whereNot('category_order', 1)
            .select('id')
            .first()

        const createAdmin = await Admin.query()
            .insert({
                uuid,
                username,
                fullname,
                email,
                password: passwordHash,
                account_type_id: accountType.id
            })

        if(!createAdmin)
        {
            const error = new Error('Failed to create admin account.')
            throw error
        }

        return res.status(201)
            .json({
                statusCode: 201,
                statusText: 'Created',
                message: 'Successfully created admin account.'
            })
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

const show = async (req, res) =>
{
    // 
}

const update = async (req, res) =>
{
    // 
}

const destroy = async (req, res) =>
{
    // 
}

module.exports =
{
    index,
    store,
    show,
    update,
    destroy
}