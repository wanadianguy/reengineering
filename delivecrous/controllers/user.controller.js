import HttpStatus from 'http-status-codes';
import {UserService} from '../services/user.service.js';
import {
    USER_CREATED,
    USER_UPDATED,
    USER_NOT_FOUND,
    USER_DELETED
} from '../constants/user.const.js';
import {StatusError} from "../Errors/statusError.js";
import {INVALID_REQUEST} from "../constants/commun.const.js";


export const UserController = {
    findAll: async (request, response, next) => {
        await UserService.findAll()
            .then(users => response.status(HttpStatus.OK).send(users))
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    findById: async (request, response, next) => {
        await UserService.findById(request.params.id)
            .then(user =>
                user
                    ? response.status(HttpStatus.OK).send(user)
                    : response.status(HttpStatus.NOT_FOUND).send({message: USER_NOT_FOUND})
            )
            .catch(() => response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST}));
    },

    create: async (request, response, next) => {
        await UserService.create(request.body)
            .then(() => response.status(HttpStatus.OK).send({message: USER_CREATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    update: async (request, response, next) => {
        await UserService.update(request.params.id, request.body)
            .then(() => response.status(HttpStatus.OK).send({message: USER_UPDATED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    delete: async (request, response, next) => {
        await UserService.delete(request.params.id)
            .then(() => response.status(HttpStatus.OK).send({message: USER_DELETED}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },
}
