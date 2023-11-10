const { Joi } = require("express-validation");

const CartValidators = {
    validateCreateUserCart: {
        body: Joi.object({
            name: Joi.string().min(5).max(30).required(),
        }),
    },
};

module.exports = CartValidators;