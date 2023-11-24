import { Joi } from 'express-validation';

export const UserValidator = {
    validateCreate: {
        body: Joi.object({
            username: Joi.string().min(5).max(30).required(),
            password: Joi.string().min(5).max(30).required(),
        }),
    },
};
