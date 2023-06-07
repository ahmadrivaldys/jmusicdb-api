const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const routes = require('./src/routes')
const errorHandler = require('./src/middlewares/error-handler')

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/images', express.static(path.join(__dirname, 'uploads/images')))

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