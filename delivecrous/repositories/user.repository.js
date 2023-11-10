const db = require("../models/user.js");

const UserRepository = {
    findAll: () => {
        return db.find();
    },

    findById: (id) => {
        return db.findById(id);
    },

    create: (user) => {
        return new db(user).save();
    },

    update: (id, user) => {
        return db.findByIdAndUpdate(id, user);
    },

    delete: (id) => {
        return db.findByIdAndDelete(id);
    },

    getUserByNameAndPassword: (username) => {
        const user = db.findOne({ username: username });
        return user ? user : null;
      }
    
};

module.exports = UserRepository;