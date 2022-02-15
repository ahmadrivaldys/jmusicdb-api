const router = require('express').Router()

router.get('/api/v1/albums', (req, res) =>
{
    res.json({
        message: 'All Albums'
    })
})

module.exports = router