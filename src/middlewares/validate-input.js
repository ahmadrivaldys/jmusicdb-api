const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const Admin = require('../models/admin')
const User = require('../models/user')

const validate =
{
    admin:
    {
        store:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .isLength({ min: 5, max: 20 }).withMessage('Minimum character length is 5 and maximum is 20.')
                .custom(value =>
                {
                    return Admin.query()
                        .where('username', value)
                        .first()
                        .then(admin =>
                        {
                            if(admin) return Promise.reject('Username already in use.')
                        })
                }),
            body('fullname')
                .isAlpha('en-US', { ignore: '\s' }).isLength({ min: 5, max: 50 }).withMessage('Minimum character length is 5 and maximum is 50.'),
            body('email')
                .not().isEmpty().withMessage('E-mail is required.')
                .isEmail().withMessage('Invalid e-mail.')
                .custom(value =>
                {
                    return Admin.query()
                        .where('email', value)
                        .first()
                        .then(admin =>
                        {
                            if(admin) return Promise.reject('E-mail already in use.')
                        })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.'),
            body('password_confirmation')
                .not().isEmpty().withMessage('Password confirmation is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.')
                .custom((value, { req }) =>
                {
                    if(value !== req.body.password) throw new Error('Password confirmation does not match password.')
                
                    return true
                }),
        ],
        login:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .custom(value =>
                {
                    return Admin.query()
                        .where('username', value)
                        .first()
                        .then(admin =>
                        {
                            if(!admin) return Promise.reject('There is no account with that username.')
                        })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .custom((value, { req }) =>
                {
                    return Admin.query()
                        .where('username', req.body.username)
                        .first()
                        .then(admin =>
                        {
                            if(admin)
                            {
                                return bcrypt.compare(value, admin.password).then(result =>
                                {
                                    if(!result) return Promise.reject('Incorrect password.')
                                })
                            }
                        })
                })
        ]
    },
    auth:
    {
        register:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .isLength({ min: 5, max: 20 }).withMessage('Minimum character length is 5 and maximum is 20.')
                .custom(value =>
                {
                    return User.query()
                        .where('username', value)
                        .first()
                        .then(user =>
                        {
                            if(user) return Promise.reject('Username already in use.')
                        })
                }),
            body('fullname')
                .isAlpha('en-US', { ignore: '\s' }).isLength({ min: 5, max: 50 }).withMessage('Minimum character length is 5 and maximum is 50.'),
            body('email')
                .not().isEmpty().withMessage('E-mail is required.')
                .isEmail().withMessage('Invalid e-mail.')
                .custom(value =>
                {
                    return User.query()
                        .where('email', value)
                        .first()
                        .then(user =>
                        {
                            if(user) return Promise.reject('E-mail already in use.')
                        })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.'),
            body('password_confirmation')
                .not().isEmpty().withMessage('Password confirmation is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.')
                .custom((value, { req }) =>
                {
                    if(value !== req.body.password) throw new Error('Password confirmation does not match password.')
                
                    return true
                }),
        ],
        login:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .custom(value =>
                {                     
                    return User.query()
                        .where('username', value)
                        .first()
                        .then(user =>
                        {
                            if(!user) return Promise.reject('There is no account with that username.')
                        })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .custom((value, { req }) =>
                {
                    return User.query()
                        .where('username', req.body.username)
                        .first()
                        .then(user =>
                        {
                            if(user)
                            {
                                return bcrypt.compare(value, user.password).then(result =>
                                {
                                    if(!result) return Promise.reject('Incorrect password.')
                                })
                            }
                        })
                })
        ]
    },
    song:
    {
        store:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('track_no').not().isEmpty().withMessage('Track No. is required.'),
            body('catalog_id').not().isEmpty().withMessage('Catalog is required.'),
            // body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            // body('release_date').not().isEmpty().withMessage('Release Date is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.')
        ],
        update:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('track_no').not().isEmpty().withMessage('Track No. is required.'),
            body('catalog_id').not().isEmpty().withMessage('Catalog is required.'),
            // body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            // body('release_date').not().isEmpty().withMessage('Release Date is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.')
        ],
    }
}

module.exports = validate