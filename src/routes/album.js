const router = require('express').Router()

router.get('/albums', (req, res) =>
{
    res.json({
        message: 'All Albums'
    })
})

module.exports = router