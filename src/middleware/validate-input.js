const { body } = require('express-validator')

const validate =
{
    admin:
    {
        store:
        [
            body('username').isLength({ min: 5, max: 20 }).withMessage('Minimum character length is 5 and maximum is 20.'),
            body('username').not().isEmpty().withMessage('Username is required.').isAlphanumeric(),
            body('fullname').isAlpha('en-US', { ignore: '\s' }).isLength({ min: 5, max: 50 }).withMessage('Minimum character length is 5 and maximum is 50.'),
            body('email').not().isEmpty().withMessage('E-mail is required.').isEmail(),
            body('password').not().isEmpty().withMessage('Password is required.').isAlphanumeric()
        ],
    },
    auth:
    {
        register:
        [
            body('username').not().isEmpty().withMessage('Username is required.')
                            .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                            .isLength({ min: 5, max: 20 }).withMessage('Minimum character length is 5 and maximum is 20.'),
            body('fullname').isAlpha('en-US', { ignore: '\s' }).isLength({ min: 5, max: 50 }).withMessage('Minimum character length is 5 and maximum is 50.'),
            body('email').not().isEmpty().withMessage('E-mail is required.')
                        .isEmail().withMessage('Invalid e-mail.'),
            body('password').not().isEmpty().withMessage('Password is required.').isAlphanumeric(),
            body('password_confirmation').not().isEmpty().withMessage('Password confirmation is required.').isAlphanumeric(),
            body('password_confirmation').custom((value, { req }) =>
            {
                if(value !== req.body.password) throw new Error('Password confirmation does not match password.')
            
                return true
            })
        ],
        login:
        [
            body('username').not().isEmpty().withMessage('Username is required.').isAlphanumeric(),
            body('password').not().isEmpty().withMessage('Password is required.').isAlphanumeric()
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