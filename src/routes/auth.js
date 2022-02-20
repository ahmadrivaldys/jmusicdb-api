const router   = require('express').Router()
const validate = require('../middleware/input-validation')
const auth     = require('../controllers/auth')

router.post('/api/v1/auth/login', validate.auth.login, auth.login)

module.exports = router