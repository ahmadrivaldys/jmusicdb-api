const express    = require('express')
const app        = express()
const bodyParser = require('body-parser')
const multer     = require('multer')
const path       = require('path')
const routes     = require('./src/routes')
const errorHandler = require('./src/middlewares/error-handler')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images'),
    filename: (req, file, cb) => cb(null, `${new Date().getTime()}-${file.originalname}`)
})

app.use(bodyParser.json())
app.use('/public/images', express.static(path.join(__dirname, 'public/images')))
app.use(multer({ storage: fileStorage }).single('image'))

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/v1', routes)
app.use(errorHandler)

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