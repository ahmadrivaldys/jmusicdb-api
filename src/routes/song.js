const router = require('express').Router()
const isAuth = require('../middlewares/authenticate')
const validate = require('../middlewares/validate-input')
const song = require('../controllers/Song')

router.get('/songs', song.all)
router.post('/song', [isAuth.admin, validate.song.store], song.store)
router.get('/song/:id', song.show)
router.put('/song/:id', [isAuth.admin, validate.song.update], song.update)
router.delete('/song/:id', isAuth.admin, song.destroy)

module.exports = router