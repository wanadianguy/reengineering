const { Joi } = require("express-validation");

const UserValidators = {
    validateCreate: {
        body: Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().min(5).max(30).required(),
        }),
    },
};

module.exports = UserValidators;