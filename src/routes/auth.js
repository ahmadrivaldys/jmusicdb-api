const router = require('express').Router()
const isAuth = require('../middlewares/authenticate')
const validate = require('../middlewares/validate-input')
const auth = require('../controllers/Auth')

router.post('/auth/register', validate.auth.register, auth.register)
router.post('/auth/login', validate.auth.login, auth.login)
router.post('/auth/logout', isAuth.verifyBeforeLogout, auth.logout)
router.post('/auth/refresh', isAuth.index, auth.refreshToken)

module.exports = router