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
        return database(tableName).where('id', id)
    }

    const select = () => database(tableName)
    const where = () => database(tableName)

    return {
        all,
        create,
        findById,
        select,
        where
    }
}