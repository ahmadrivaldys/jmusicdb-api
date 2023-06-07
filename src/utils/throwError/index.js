const throwError = (message, errorCode) =>
{
    const error = new Error(message)
    error.statusCode = errorCode
    throw error
}

module.exports = throwError