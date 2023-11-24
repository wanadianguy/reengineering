import express from 'express';
import {validate} from 'express-validation';
import {DishController} from '../controllers/dish.controller.js';
import {DishValidator} from '../validators/dish.validators.js';

const DishRouter = express.Router();

DishRouter
    .route('/')
    .get(DishController.findAll)
    .post(validate(DishValidator.validateCreate), DishController.create);

DishRouter
    .route('/search')
    .get(DishController.findByKeyWord);

DishRouter
    .route('/:id')
    .get(DishController.findById)
    .put(validate(DishValidator.validateUpdate), DishController.update)
    .delete(DishController.delete);

export default DishRouter;
