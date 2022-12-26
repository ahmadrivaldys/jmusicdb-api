const router = require('express').Router()
const isAuth = require('../middlewares/authenticate')
const validate = require('../middlewares/validate-input')
const artist = require('../controllers/artist')

router.get('/artists', isAuth.admin, artist.all)
router.post('/artist', [isAuth.admin, validate.artist.store], artist.store)

module.exports = router