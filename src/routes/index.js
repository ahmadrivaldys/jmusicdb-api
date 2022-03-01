const router = require('express').Router()
const admin  = require('./admin')
const album  = require('./album')
const auth   = require('./auth')
const song   = require('./song')

router.get('/', (req, res) =>
{
    res.json({
        message: 'Welcome to Japanese Music DB API'
    })
})

router.use(admin)
router.use(album)
router.use(auth)
router.use(song)

module.exports = router