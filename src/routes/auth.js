const router   = require('express').Router()
const validate = require('../middleware/validate-input')
const auth     = require('../controllers/auth')

router.post('/api/v1/auth/login', validate.auth.login, auth.login)
router.post('/api/v1/auth/logout', auth.logout)

module.exports = router