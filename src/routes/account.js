const router   = require('express').Router()
const validate = require('../middlewares/validate-input')
const admin    = require('../controllers/account/admin')

router.post('/account/admin', validate.account.create_admin, admin.store)

module.exports = router