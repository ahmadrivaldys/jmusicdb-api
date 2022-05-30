const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const AccountType = require('../../models/account_type')
const Admin = require('../../models/admin')

const index = async (req, res) =>
{
    // 
}

const store = async (req, res, next) =>
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

        await Admin.query()
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