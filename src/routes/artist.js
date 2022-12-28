const router = require('express').Router()
const upload = require('../../config/multipart-formdata')
const isAuth = require('../middlewares/authenticate')
const validate = require('../middlewares/validate-input')
const artist = require('../controllers/Artist')

router.get('/artists', isAuth.admin, artist.all)
router.post('/artist', [upload.single('photo'), isAuth.admin, validate.artist.store], artist.store)

module.exports = router