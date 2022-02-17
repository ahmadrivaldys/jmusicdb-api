const router   = require('express').Router()
const validate = require('../middleware/input-validation')
const song     = require('../controllers/song')

router.get('/api/v1/songs', song.index)
router.get('/api/v1/song/:id', song.show)
router.post('/api/v1/song', validate.song.store, song.store)
// router.put('/api/v1/song/:id', song.store)
// router.delete('/api/v1/song/:id', song.store)

module.exports = router