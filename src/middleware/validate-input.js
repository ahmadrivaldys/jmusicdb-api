const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const { User, Admin } = require('../models')

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
                    return Admin.where('username', value).first().then(user =>
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
                    return Admin.where('email', value).first().then(user =>
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
                    return Admin.where('username', value).first().then(user =>
                    {
                        if(!user) return Promise.reject('There is no account with that username.')
                    })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .custom(async (value, { req }) =>
                {
                    const checkUser = await Admin.where('username', req.body.username).first()
                    
                    if(checkUser)
                    {
                        const checkPassword = await bcrypt.compare(value, checkUser.password)
                        if(!checkPassword) return Promise.reject('Incorrect password.')
                    }
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
                    return User.where('username', value).first().then(user =>
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
                    return User.where('email', value).first().then(user =>
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
                    return Admin.where('username', value).first().then(user =>
                    {
                        if(!user) return Promise.reject('There is no account with that username.')
                    })
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .custom(async (value, { req }) =>
                {
                    const checkUser = await Admin.where('username', req.body.username).first()
                    
                    if(checkUser)
                    {
                        const checkPassword = await bcrypt.compare(value, checkUser.password)
                        if(!checkPassword) return Promise.reject('Incorrect password.')
                    }
                })
        ]
    },
    song:
    {
        store:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('catalog_id').not().isEmpty().withMessage('Catalog is required.'),
            body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.')
        ],
        update:
        [
            body('title').not().isEmpty().withMessage('Title is required.'),
            body('catalog_id').not().isEmpty().withMessage('Catalog is required.'),
            body('artists_id').not().isEmpty().withMessage('Artist is required.'),
            body('duration').not().isEmpty().withMessage('Duration is required.')
        ],
    }
}

module.exports = validate