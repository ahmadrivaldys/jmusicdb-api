const router = require('express')()
const album  = require('./albumRoutes')
const song   = require('./songRoutes')

router.get('/api/v1/', (req, res) =>
{
    res.json({
        message: 'Welcome to Japanese Music DB API'
    })
})

router.use(album)
router.use(song)

module.exports = router