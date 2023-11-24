import {UserRepository} from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import {USER_ALREADY_EXISTS, USER_NOT_FOUND} from "../constants/user.const.js";
import {StatusError} from "../Errors/statusError.js";
import HttpStatus from "http-status-codes";
import {CartRepository} from "../repositories/cart.repository.js";

export const UserService = {
    findAll: () => UserRepository.findAll(),

    findById: (id) => UserRepository.findById(id),

    create: async (user) => {
        const existingUser = await UserRepository.findByUsername(user.username);
        if (existingUser) throw new StatusError(HttpStatus.BAD_REQUEST, USER_ALREADY_EXISTS);
        user.password = await bcrypt.hash(user.password, 10);
        return UserRepository.create(user);
    },

    update: async (id, userInfo) => {
        const user = await UserRepository.findById(id);
        if (!user) throw new StatusError(HttpStatus.NOT_FOUND, USER_NOT_FOUND);
        userInfo.password = await bcrypt.hash(userInfo.password, 10);
        return UserRepository.update(id, userInfo);
    },

    delete: async (id) => {
        const user = await UserRepository.findById(id);
        if (!user) throw new StatusError(HttpStatus.NOT_FOUND, USER_NOT_FOUND);
        await CartRepository.deleteUserCarts(id);
        return UserRepository.delete(id);
    },
};
