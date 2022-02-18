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

    const update = props =>
    {
        return database(tableName).update(props).update('updated_at', database.fn.now())
    }

    const select = () => database(tableName)
    const where = (key, value) => database(tableName).where(key, value)

    return {
        all,
        create,
        findById,
        update,
        select,
        where
    }
}