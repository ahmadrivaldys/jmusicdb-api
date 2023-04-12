const router = require('express').Router()
const isAuth = require('../middlewares/authenticate')
const catalog = require('../controllers/Catalog')

router.get('/catalogs', isAuth.admin, catalog.all)
router.get('/catalog-types', isAuth.admin, catalog.catalogTypes)

module.exports = router