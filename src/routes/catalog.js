const router  = require('express').Router()
const catalog = require('../controllers/catalog')

router.get('/catalogs', catalog.index)

module.exports = router