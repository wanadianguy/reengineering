import HttpStatus from 'http-status-codes';
import {DishService} from '../services/dish.service.js';
import {DISH_NOT_FOUND, DISH_CREATED, DISH_UPDATED} from '../constants/dish.const.js';
import {INVALID_REQUEST} from "../constants/commun.const.js";
import {StatusError} from "../Errors/statusError.js";

export const DishController = {
    findAll: async (request, response, next) => {
        await DishService.findAll()
            .then(dishes => response.status(HttpStatus.OK).send(dishes))
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    findById: async (request, response, next) => {
        await DishService.findById(request.params.id)
            .then(dish => dish
                ? response.status(HttpStatus.OK).send(dish)
                : response.status(HttpStatus.OK).send({message: DISH_NOT_FOUND})
            )
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    findByKeyWord: async (request, response, next) => {
        await DishService.findByKeyWord(request.query.keyword)
            .then(dishes => response.status(HttpStatus.OK).send(dishes))
            .catch(error => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },


    create: async (request, response, next) => {
        await DishService.create(request.body)
            .then(() => response.status(HttpStatus.OK).send({message: DISH_CREATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    update: async (request, response, next) => {
        await DishService.update(request.params.id, request.body)
            .then(() => response.status(HttpStatus.OK).send({message: DISH_UPDATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    delete: async (request, response, next) => {
        await DishService.delete(request.params.id)
            .then(() => response.status(HttpStatus.OK).send({message: DISH_UPDATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },
};
