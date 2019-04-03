const { check } = require('express-validator/check');

module.exports = [
    check('school').not().isEmpty().withMessage('School sould not be empty'),
    check('fieldofstudy').not().isEmpty().withMessage('Fieldofstudy sould not be empty'),
    check('degree').not().isEmpty().withMessage('Degree sould not be empty'),
    check('from').not().isEmpty().withMessage('From sould not be empty'),
]