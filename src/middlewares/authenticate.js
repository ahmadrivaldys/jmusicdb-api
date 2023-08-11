const verifyToken = require('./verify-token')
const AccountType = require('../models/AccountType')
const Admin = require('../models/Admin')
const { throwError } = require('../utils')

const refresh = async (req, res, next) =>
{
    try
    {
        const decoded = await verifyToken(req.headers, 'refresh')

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

const admin = async (req, res, next) =>
{
    try
    {
        const decoded = await verifyToken(req.headers, 'read')

        const accountType = await AccountType.query()
            .where({ category: 'admin', category_order: 1 })
            .select('id')
            .first()

        const checkAccount = await Admin.query()
            .where({ uuid: decoded.uuid, username: decoded.username, account_type_id: accountType.id })
            .select('username', 'fullname')
            .withGraphFetched('[account_type(selectAccountType)]')
            .modifiers({
                selectAccountType: builder => builder.select('name')
            })
            .first()

        if(!checkAccount) throwError('Only admin is allowed.', 403)

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

const user = async (req, res, next) =>
{
    // 
}

const verifyBeforeLogout = async (req, res, next) =>
{
    try
    {
        const tokens = await verifyToken(req.headers, 'remove')
        
        req.verified_token = tokens.accessToken
        req.verified_refresh_token = tokens.refreshToken

        next()
    }
    catch(error)
    {
        console.log(error)
        next(error)
    }
}

module.exports = { refresh, admin, verifyBeforeLogout }