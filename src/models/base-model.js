const database = require('../../config/database')

module.exports = (tableName) =>
{
    const all = () => database(tableName)

    const create = props =>
    {
        return database(tableName).insert(props)
    }

    const findById = id =>
    {
        return database(tableName).where('id', id).first()
    }

    const findByUUID = id =>
    {
        return database(tableName).where('uuid', id).first()
    }

    const update = props =>
    {
        return database(tableName).update(props).update('updated_at', database.fn.now())
    }

    const destroy = id =>
    {
        return database(tableName).del().where('id', id)
    }

    const select = () => database(tableName)
    
    const where = (params, value = null) =>
    {
        if(typeof params === 'object' && value === null) return database(tableName).where(params)
        if(typeof params === 'string' && value !== null) return database(tableName).where(params, value)
        return console.log('Invalid format.')
    }

    return {
        all,
        create,
        findById,
        findByUUID,
        update,
        destroy,
        select,
        where
    }
}