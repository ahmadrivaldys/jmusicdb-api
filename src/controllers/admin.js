const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const { AccountType, Admin } = require('../models')

const index = async (req, res) =>
{
    // 
}

const store = async (req, res) =>
{
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        res.status(422).json({ errors: errors.mapped() })
    }
    else
    {
        try
        {
            const { username, fullname, email, password, account_type_code } = req.body

            const salt = bcrypt.genSaltSync(10)
            const passwordHash = bcrypt.hashSync(password, salt)
            const accountType = await AccountType.where('code', account_type_code).first()

            const create = await Admin.create({
                uuid: uuidv4(),
                username,
                fullname,
                email,
                password: passwordHash,
                account_type_id: accountType.id
            })

            const createdData = await Admin.findByUUID(create)

            res.status(201)
            res.json({
                statusCode: 201,
                statusMessage: 'Created',
                message: 'Successfully created admin account.',
                data: createdData
            })
        }
        catch(error)
        {
            console.log(error)
            res.status(422).json(error)
        }
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