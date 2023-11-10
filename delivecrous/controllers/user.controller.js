const HttpStatus = require('http-status-codes');
const UserService = require("../services/user.service");


const UserController = {
    findAll: async (request, response, next) => {
        response.status(HttpStatus.OK).send(await UserService.findAll());
    },

    findById: async (request, response, next) => {
        response.status(HttpStatus.OK).send(await UserService.findById(request.params.id));
    },

    create: async (request, response, next) => {
        await UserService.create(request.body);
        response.status(HttpStatus.OK).send({ message: "user created successfully" });
    },

    update: async (request, response, next) => {
        const userId = request.params.id;
        const userInfo = request.body;

        try {
            await UserService.update(userId, userInfo);
            response.status(HttpStatus.OK).send({ message: "user updated successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `user with id - ${userId} not found`});
        }
    },

    delete: async (request, response, next) => {
        const userId = request.params.id;
        
        try {
            await UserService.delete(userId);
            response.status(HttpStatus.OK).send({ message: "user deleted successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `user with id - ${userId} not found`});
        }
    },
}

module.exports = UserController;
