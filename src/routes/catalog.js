const router = require('express').Router()
const isAuth = require('../middlewares/authenticate')
const catalog = require('../controllers/Catalog')

router.get('/catalogs', catalog.index)
router.get('/catalog-types', isAuth.admin, catalog.catalogTypes)

module.exports = router