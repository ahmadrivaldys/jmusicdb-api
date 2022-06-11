const errorHandler = (error, req, res, next) =>
{
    let statusCode = 422
    let statusText = 'Unprocessable Entity'

    if(error.statusCode === 404)
    {
        statusCode = 404
        statusText = 'Not Found'
    }

    if(error.statusCode === 401)
    {
        statusCode = 401
        statusText = 'Unauthorized'
    }

    let responsesData = {
        statusCode,
        statusText,
        message: error.message
    }

    if(error.errors)
    {
        responsesData = {
            statusCode,
            statusText,
            message: error.message,
            errors: error.errors
        }
    }

    return res.status(statusCode).json(responsesData)
}

module.exports = errorHandler