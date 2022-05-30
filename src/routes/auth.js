const router   = require('express').Router()
const validate = require('../middlewares/validate-input')
const { admin: authAdmin, user: authUser } = require('../controllers/auth')

router.post('/auth/admin/login', validate.admin.login, authAdmin.login)
router.post('/auth/admin/logout', authAdmin.logout)
router.post('/auth/register', validate.auth.register, authUser.register)
router.post('/auth/login', validate.auth.login, authUser.login)
router.post('/auth/logout', authUser.logout)

module.exports = router