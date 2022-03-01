const router   = require('express').Router()
const auth     = require('../middleware/authenticate')
const validate = require('../middleware/validate-input')
const song     = require('../controllers/song')

router.get('/songs', song.index)
router.post('/song', [auth, validate.song.store], song.store)
router.get('/song/:id', song.show)
router.put('/song/:id', [auth, validate.song.update], song.update)
router.delete('/song/:id', auth, song.destroy)

module.exports = router