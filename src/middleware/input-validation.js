const { body } = require('express-validator')

const validate =
{
    admin:
    {
        store:
        [
            body('username').isLength({ min: 5, max: 20 }),
            body('username').not().isEmpty().withMessage('Username is required.').isAlphanumeric(),
            body('fullname').isAlpha().isLength({ min: 5, max: 50 }),
            body('email').not().isEmpty().withMessage('E-mail is required.').isEmail(),
            body('password').not().isEmpty().withMessage('Password is required.').isAlphanumeric()
        ],
    },
    auth:
    {
        register:
        [
            body('username').isLength({ min: 5, max: 20 }),
            body('username').not().isEmpty().withMessage('Username is required.').isAlphanumeric(),
            body('fullname').isAlpha().isLength({ min: 5, max: 50 }),
            body('email').not().isEmpty().withMessage('E-mail is required.').isEmail(),
            body('password').not().isEmpty().withMessage('Password is required.').isAlphanumeric()
        ],
        login:
        [
            body('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
            body('password').not().isEmpty().withMessage('required value').isAlphanumeric()
        ]
    },
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
        update:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('album_id').not().isEmpty().withMessage('Album is required.'),
            body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.'),
            body('slug').not().isEmpty().withMessage('Duration is required.'),
            body('author_id').not().isEmpty().withMessage('Author is required.')
        ],
    }
}

module.exports = validate