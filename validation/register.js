const { check , validationResult } = require('express-validator/check');

module.exports = () => {
    return [
        check('email').not().isEmpty().withMessage('Email address is required')
        .isEmail().withMessage('This is not a valid email address'),
        check('name').not().isEmpty().withMessage('Name is required'),
        check('password').not().isEmpty().withMessage('Password is required'),
        check('password2').not().isEmpty().withMessage('Confirm password is required')
    ]
}