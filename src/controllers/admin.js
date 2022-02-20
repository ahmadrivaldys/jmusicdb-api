const { validationResult } = require('express-validator')
const { Admin } = require('../models')

const index = async (req, res) =>
{
    // 
}

const store = async (req, res) =>
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
            const create = await Admin.create(req.body)
            const createdData = await Admin.findById(create)

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