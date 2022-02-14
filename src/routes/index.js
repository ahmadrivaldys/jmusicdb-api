const router = require('express')()
const album  = require('./album')
const song   = require('./song')

router.get('/api/v1/', (req, res) =>
{
    res.json({
        message: 'Welcome to Japanese Music DB API'
    })
})

router.use(album)
router.use(song)

module.exports = router