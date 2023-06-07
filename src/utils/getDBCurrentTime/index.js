const db = require('../../../config/database')

const getDBCurrentTime = () => db.fn.now()

module.exports = getDBCurrentTime