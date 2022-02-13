const router = require('express')()

router.get('/api/v1/songs', (req, res) =>
{
    res.json({
        message: 'All Songs'
    })
})

module.exports = router