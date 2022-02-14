const router = require('express')()
const song   = require('../controllers/song')

router.get('/api/v1/songs', song.index)

module.exports = router