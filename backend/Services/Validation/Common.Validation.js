const { check } = require('express-validator');

exports.BlogValidator = [

        check('name')
                .isLength({ min: 4, max: 20 }).withMessage('Name must be  between 4 characters long or 20 characters min.')
                .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
        check('email', 'Please provide a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
        check("description").not().isEmpty().withMessage("description can not  be blank."),
];