const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const multer     = require('multer')
const path       = require('path')
const routes     = require('./src/routes')
require('dotenv').config()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images'),
    filename: (req, file, cb) => cb(null, `${new Date().getTime()}-${file.originalname}`)
})

app.use(bodyParser.json())
app.use('/public/images', express.static(path.join(__dirname, 'public/images')))
app.use(multer({ storage: fileStorage }).single('image'))
app.use('/v1', routes)

const server = app.listen(process.env.APP_PORT, () =>
{
    console.log(`API running in port ${process.env.APP_PORT}`)
})

process.on('SIGTERM', () =>
{
    console.info('SIGTERM signal received.')

    console.log('Closing http server.')
    server.close(() =>
    {
        console.log('Http server closed.')
        process.exit(0)
    })
})