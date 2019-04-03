const { check } = require('express-validator/check');

module.exports = () => [
    check('text').exists().withMessage('Text is required')
]