const router  = require('express').Router()
const account = require('./account')
const artist  = require('./artist')
const auth    = require('./auth')
const catalog = require('./catalog')
const song    = require('./song')

router.get('/', (req, res) =>
{
    res.json({
        message: 'Welcome to Japanese Music DB API'
    })
})

router.use(account)
router.use(artist)
router.use(auth)
router.use(catalog)
router.use(song)

module.exports = router