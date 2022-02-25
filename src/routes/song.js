const router   = require('express').Router()
const auth     = require('../middleware/authenticate')
const validate = require('../middleware/validate-input')
const song     = require('../controllers/song')

router.get('/api/v1/songs', song.index)
router.post('/api/v1/song', [auth, validate.song.store], song.store)
router.get('/api/v1/song/:id', song.show)
router.put('/api/v1/song/:id', [auth, validate.song.update], song.update)
router.delete('/api/v1/song/:id', auth, song.destroy)

module.exports = router