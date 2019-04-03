const {  check } = require('express-validator/check');

module.exports = [
    check('handle').not().isEmpty().withMessage('Profile handle is required'),
    check('status').not().isEmpty().withMessage('Status is required'),
    check('skills').not().isEmpty().withMessage('Skills is required')
];