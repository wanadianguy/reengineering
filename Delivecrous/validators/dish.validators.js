const { Joi } = require("express-validation");

const DishValidators = {
    validateCreate: {
        body: Joi.object({
            name: Joi.string().min(5).max(30).required(),
            description: Joi.string().min(5).max(150).required(),
            price: Joi.number().integer().min(0).max(150).required(), 
            allergens: Joi.string().min(5).max(150).required(),
        }),
    },
    validateUpdate: {
          body: Joi.object({
            name: Joi.string().min(5).max(30).required(),
            description: Joi.string().min(5).max(150).required(),
            price: Joi.number().integer().min(0).max(150).required(), 
            allergens: Joi.string().min(5).max(150).required(),
        }),
    },
};

module.exports = DishValidators;