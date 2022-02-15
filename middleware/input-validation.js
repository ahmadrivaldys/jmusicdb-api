const { body } = require('express-validator')

const validate =
{
    song:
    {
        store:
        [
            body('title').not().isEmpty().withMessage('Input is required.')
        ],
        update: ''
    }
}

module.exports = validate