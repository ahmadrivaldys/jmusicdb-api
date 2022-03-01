const router   = require('express').Router()
const validate = require('../middleware/validate-input')
const auth     = require('../controllers/auth')

router.post('/auth/admin/login', validate.auth.login, auth.admin.login)
router.post('/auth/admin/logout', auth.admin.logout)
router.post('/auth/register', validate.auth.register, auth.user.register)
router.post('/auth/login', validate.auth.login, auth.user.login)
router.post('/auth/logout', auth.user.logout)

module.exports = router