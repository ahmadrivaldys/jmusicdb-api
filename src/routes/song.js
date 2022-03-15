const router   = require('express').Router()
const auth     = require('../middleware/authenticate')
const validate = require('../middleware/validate-input')
const song     = require('../controllers/song')

router.get('/songs', auth.admin, song.index)
router.post('/song', [auth.admin, validate.song.store], song.store)
router.get('/song/:uuid', song.show)
router.put('/song/:uuid', [auth.admin, validate.song.update], song.update)
router.delete('/song/:uuid', auth.admin, song.destroy)

module.exports = router