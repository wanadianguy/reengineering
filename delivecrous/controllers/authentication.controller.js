import HttpStatus from 'http-status-codes';
import {AuthenticationService} from '../services/authentication.service.js';
import {StatusError} from "../Errors/statusError.js";
import {INVALID_REQUEST} from "../constants/commun.const.js";
import {ERROR_TOKEN_REQUIRED, EXPIRED_TOKEN, INVALID_TOKEN} from "../constants/authentication.const.js";
import jwt from "jsonwebtoken";

export const AuthenticationController = {
    login: async (request, response, next) => {
        await AuthenticationService.login(request.body.username, request.body.password)
            .then(token => response.status(HttpStatus.OK).send({token: token}))
            .catch(error => error instanceof StatusError
                ? response.status(error.requestStatus).send({message: error.message})
                : response.status(HttpStatus.BAD_REQUEST).send({message: INVALID_REQUEST})
            );
    },

    verifyToken: async (request, response, next) => {
        const userToken = request.headers.authorization;
        if (!userToken) response.status(HttpStatus.UNAUTHORIZED).send({error: ERROR_TOKEN_REQUIRED});
        const token = userToken.replace('Bearer ', '');
        try {
            if (AuthenticationService.checkToken(token)) {
                return next();
            } else {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: INVALID_TOKEN})
            }
        } catch (error) {
            error instanceof jwt.TokenExpiredError
                ? response.status(HttpStatus.UNAUTHORIZED).send({message: EXPIRED_TOKEN})
                : response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: INVALID_TOKEN})
        }
    }
}
