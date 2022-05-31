const Admin = require('../models/admin')
const User = require('../models/user')

const getAccount = async (account_type, conditions) =>
{
    if(account_type === 'admin')
    {
        const getAdminAccount = await Admin.query()
            .where(conditions)
            .first()
        
        return getAdminAccount
    }

    const getUserAccount = await User.query()
        .where(conditions)
        .first()

    return getUserAccount
}

module.exports = getAccount