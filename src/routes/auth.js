const router = require('express').Router()
const validate = require('../middlewares/validate-input')
const auth = require('../controllers/auth')

router.post('/auth/register', validate.auth.register, auth.register)
router.post('/auth/login/:account_type', validate.auth.login, auth.login)
router.post('/auth/logout', logout)

module.exports = router