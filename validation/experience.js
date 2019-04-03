const { check } = require('express-validator/check');

module.exports = [
    check('title').not().isEmpty().withMessage('Title should not be empty'),
    check('company').not().isEmpty().withMessage('Company should not be empty'),
    check('from').not().isEmpty().withMessage('From should not be empty')
];