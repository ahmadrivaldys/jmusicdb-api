const router   = require('express').Router()
const validate = require('../middleware/validate-input')
const admin    = require('../controllers/admin')

router.post('/api/v1/admin', validate.admin.store, admin.store)

module.exports = router