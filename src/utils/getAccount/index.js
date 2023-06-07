const Admin = require('../../models/Admin')
const User = require('../../models/User')

const getAccount = async (account_type, conditions) =>
{
    if(account_type === 'admin')
    {
        const getAdminAccount = await Admin.query()
            .where(conditions)
            .withGraphFetched('[account_type(selectAccountType)]')
            .modifiers({
                selectAccountType: builder => builder.select('name')
            })
            .first()
        
        return getAdminAccount
    }

    const getUserAccount = await User.query()
        .where(conditions)
        .withGraphFetched('[account_type(selectAccountType)]')
            .modifiers({
                selectAccountType: builder => builder.select('name')
            })
        .first()

    return getUserAccount
}

module.exports = getAccount