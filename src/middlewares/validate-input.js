const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const Admin = require('../models/admin')
const getAccount = require('../utils/get-account')

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
                .custom(async username =>
                {
                    const account = await getAccount(null, { username })
                    if(account) return Promise.reject('Username already in use.')
                }),
            body('fullname')
                .not().isEmpty().withMessage('Fullname is required.')
                .isAlpha('en-US', { ignore: '\s' }).withMessage('Only letters are allowed.')
                .isLength({ min: 5, max: 50 }).withMessage('Minimum character length is 5 and maximum is 50.'),
            body('email')
                .not().isEmpty().withMessage('E-mail is required.')
                .isEmail().withMessage('Invalid e-mail.')
                .custom(async email =>
                {
                    const account = await getAccount(null, { email })
                    if(account) return Promise.reject('E-mail already in use.')
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.'),
            body('password_confirmation')
                .not().isEmpty().withMessage('Password confirmation is required.')
                .isLength({ min: 8, max: 25 }).withMessage('Minimum character length is 8 and maximum is 25.')
                .custom(async (password_confirmation, { req }) =>
                {
                    if(password_confirmation !== req.body.password) return Promise.reject('Password confirmation does not match password.')
                })
        ],
        login:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .custom(async (username, { req }) =>
                {
                    const account = await getAccount(req.query.account_type, { username })
                    if(!account) return Promise.reject('There is no account with that username.')
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .custom(async (password, { req }) =>
                {
                    const account = await getAccount(req.query.account_type, { username: req.body.username })
                    
                    if(account)
                    {
                        const comparePassword = await bcrypt.compare(password, account.password)
                        if(!comparePassword) return Promise.reject('Incorrect password.')
                    }
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