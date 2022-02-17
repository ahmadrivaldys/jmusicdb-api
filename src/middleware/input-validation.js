const { body } = require('express-validator')

const validate =
{
    song:
    {
        store:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('album_id').not().isEmpty().withMessage('Album is required.'),
            body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.'),
            body('slug').not().isEmpty().withMessage('Duration is required.'),
            body('author_id').not().isEmpty().withMessage('Author is required.')
        ],
        update: ''
    }
}

module.exports = validate