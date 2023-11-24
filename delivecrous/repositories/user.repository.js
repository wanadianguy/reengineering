import database from '../models/user.js';

export const UserRepository = {
    findAll: () => database.find(),

    findById: (id) => database.findById(id),

    findByUsername: (username) => database.findOne({username}),

    create: (user) => new database(user).save(),

    update: (id, user) => database.findByIdAndUpdate(id, user),

    delete: (id) => database.findByIdAndDelete(id),
};
