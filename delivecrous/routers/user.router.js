import express from 'express';
import {UserController} from '../controllers/user.controller.js';
import {validate} from 'express-validation';
import {UserValidator} from '../validators/user.validators.js';

const UserRouter = express.Router();

UserRouter
    .route('/')
    .get(UserController.findAll)
    .post(validate(UserValidator.validateCreate), UserController.create);

UserRouter
    .route('/:id')
    .get(UserController.findById)
    .put(UserController.update)
    .delete(UserController.delete);

export default UserRouter;
