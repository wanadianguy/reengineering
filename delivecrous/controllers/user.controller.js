const UserService = require("../services/user.service");


const UserController = {
    findAll: async (req, res, next) => {
        const users = await UserService.findAll();
        res.status(200).send(users);
    },

    findById: async (req, res, next) => {
        const userId = req.params.id;
        const user = await UserService.findById(userId);
        res.status(200).send(user);
    },

    create: async (req, res, next) => {
        const user = req.body;
        await UserService.create(user);
        res.status(200).send({ message: "user created successfully" });
    },

    update: async (req, res, next) => {
        const userId = req.params.id;
        const userInfo = req.body;
        try {
            await UserService.update(userId, userInfo);
            res.status(200).send({ message: "user updated successfully"});
        } catch (error) {
            res.status(404).send({ message: `user with id - ${userId} not found`});
        }
    },

    delete: async (req, res, next) => {
        const userId = req.params.id;
        try {
            await UserService.delete(userId);
            res.status(200).send({ message: "user deleted successfully"});
        } catch (error) {
            res.status(404).send({ message: `user with id - ${userId} not found`});
        }
    },
}

module.exports = UserController;
