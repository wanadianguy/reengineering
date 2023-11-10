const db = require("../models/dish.js");

const DishRepository = {
    findAll: () => {
        return db.find();
    },

    findById: (id) => {
        return db.findById(id);
    },

    findByName: (query) => {
        return db.find({ name: { $regex: '.*' + query + '.*' } });
    },

    findByDescription: (query) => {
        return db.find({ description: { $regex: '.*' + query + '.*' } });
    },

    findByAllergens: (query) => {
        return db.find({ allergens: { $regex: '.*' + query + '.*' } });
    },

    create: (dish) => {
        return new db(dish).save();
    },

    update: (id, dish) => {
        return db.findByIdAndUpdate(id, dish);
    },

    delete: (id) => {
        return db.findByIdAndDelete(id);
    },
};

module.exports = DishRepository;