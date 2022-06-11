const verifyToken = require('./verify-token')
const AccountType = require('../models/account_type')
const Admin = require('../models/admin')

const admin = async (req, res, next) =>
{
    try
    {
        const decoded = await verifyToken(req.headers)

        const accountType = await AccountType.query()
            .where({ category: 'admin', category_order: 1 })
            .select('id')
            .first()

        const checkAccount = await Admin.query()
            .where({ uuid: decoded.uuid, username: decoded.username, account_type_id: accountType.id })
            .select('username', 'fullname')
            .withGraphFetched('[account_type(selectAccountType)]')
            .modifiers({
                selectAccountType: builder => builder.select('name as access_level')
            })
            .first()

        if(!checkAccount)
        {
            const error = new Error('Only admin is allowed.')
            error.statusCode = 401
            throw error
        }

        req.uuid = decoded.uuid
        req.username = decoded.username
    
        next()
    }
    catch(error)
    {
        console.log('Error:', error.message)
        next(error)
    }
}

const verifyBeforeLogout = async (req, res, next) =>
{
    try
    {
        req.verified_token = await verifyToken(req.headers, 'logout')

        next()
    }
    catch(error)
    {
        console.log('Error:', error.message)
        next(error)
    }
}

module.exports = { admin, verifyBeforeLogout }