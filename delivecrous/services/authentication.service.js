import jwt from 'jsonwebtoken';
import {StatusError} from "../Errors/statusError.js";
import HttpStatus from "http-status-codes";
import {UserRepository} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import {EXPIRED_TOKEN, INVALID_CREDENTIALS, INVALID_TOKEN} from "../constants/authentication.const.js";

const SECRET = 'secret';

export const AuthenticationService = {
    login: async (username, password) => {
        const user = await UserRepository.findByUsername(username);
        if (!(user && (await bcrypt.compare(password, user.password)))) throw new StatusError(HttpStatus.BAD_REQUEST, INVALID_CREDENTIALS);
        return jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            SECRET,
            {expiresIn: '1 hours'},
        );
    },

    checkToken: (token) => !!jwt.verify(token, SECRET),
}
