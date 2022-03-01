const router   = require('express').Router()
const validate = require('../middleware/validate-input')
const admin    = require('../controllers/admin')

router.post('/admin', validate.admin.store, admin.store)

module.exports = router