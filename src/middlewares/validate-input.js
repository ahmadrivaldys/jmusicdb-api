const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const { getAccount } = require('../utils')

const validate =
{
    account:
    {
        create_admin:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.')
                .isLength({ max: 20 }).withMessage('Maximum character length is 20.')
                .custom(async username =>
                {
                    const account = await getAccount('admin', { username })
                    if(account) return Promise.reject('Username already in use.')
                }),
            body('fullname')
                .not().isEmpty().withMessage('Fullname is required.')
                .isAlpha('en-US', { ignore: '\s' }).withMessage('Only letters are allowed.')
                .isLength({ min: 5 }).withMessage('Fullname must be at least 5 characters long.')
                .isLength({ max: 50 }).withMessage('Maximum character length is 50.'),
            body('email')
                .not().isEmpty().withMessage('E-mail is required.')
                .isEmail().withMessage('Invalid e-mail.')
                .custom(async email =>
                {
                    const account = await getAccount('admin', { email })
                    if(account) return Promise.reject('E-mail already in use.')
                }),
            body('password')
                .not().isEmpty().withMessage('Password is required.')
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
                .isLength({ max: 25 }).withMessage('Maximum character length is 25.'),
            body('password_confirmation')
                .not().isEmpty().withMessage('Password Confirmation is required.')
                .isLength({ min: 8 }).withMessage('Password Confirmation must be at least 8 characters long.')
                .isLength({ max: 25 }).withMessage('Maximum character length is 25.')
                .custom((password_confirmation, { req }) =>
                {
                    if(password_confirmation !== req.body.password) return Promise.reject('Password confirmation does not match password.')
                }),
            body('account_type_id')
                .not().isEmpty().withMessage('Account Type is required.')
        ]
    },
    auth:
    {
        register:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
                .isAlphanumeric().withMessage('Only letters and numbers are allowed.')
                .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long.')
                .isLength({ max: 20 }).withMessage('Maximum character length is 20.')
                .custom(async username =>
                {
                    const account = await getAccount(null, { username })
                    if(account) return Promise.reject('Username already in use.')
                }),
            body('fullname')
                .not().isEmpty().withMessage('Fullname is required.')
                .isAlpha('en-US', { ignore: '\s' }).withMessage('Only letters are allowed.')
                .isLength({ min: 5 }).withMessage('Fullname must be at least 5 characters long.')
                .isLength({ max: 50 }).withMessage('Maximum character length is 50.'),
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
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
                .isLength({ max: 25 }).withMessage('Maximum character length is 25.'),
            body('password_confirmation')
                .not().isEmpty().withMessage('Password Confirmation is required.')
                .isLength({ min: 8 }).withMessage('Password Confirmation must be at least 8 characters long.')
                .isLength({ max: 25 }).withMessage('Maximum character length is 25.')
                .custom((password_confirmation, { req }) =>
                {
                    if(password_confirmation !== req.body.password) return Promise.reject('Password confirmation does not match password.')
                })
        ],
        login:
        [
            body('username')
                .not().isEmpty().withMessage('Username is required.')
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
            body('title')
                .not().isEmpty().withMessage('Title is required.'),
            body('track_no')
                .not().isEmpty().withMessage('Track No. is required.')
                .isNumeric().withMessage('Only numbers are allowed.'),
            body('catalog_id')
                .not().isEmpty().withMessage('Catalog is required.'),
            body('release_date')
                .not().isEmpty().withMessage('Release Date is required.'),
            body('minutes')
                .not().isEmpty().withMessage('Minutes is required.')
                .isNumeric().withMessage('Only numbers are allowed.'),
            body('seconds')
                .not().isEmpty().withMessage('Seconds is required.')
                .isNumeric().withMessage('Only numbers are allowed.')
        ],
        update:
        [
            body('title')
                .not().isEmpty().withMessage('Title is required.'),
            body('track_no')
                .not().isEmpty().withMessage('Track No. is required.')
                .isNumeric().withMessage('Only numbers are allowed.'),
            body('catalog_id')
                .not().isEmpty().withMessage('Catalog is required.'),
            body('release_date')
                .not().isEmpty().withMessage('Release Date is required.'),
            body('minutes')
                .not().isEmpty().withMessage('Minutes is required.')
                .isNumeric().withMessage('Only numbers are allowed.'),
            body('seconds')
                .not().isEmpty().withMessage('Seconds is required.')
                .isNumeric().withMessage('Only numbers are allowed.')
        ],
    }
}

module.exports = validate