import database from '../models/dish.js';

export const DishRepository = {
    findAll: () => database.find(),

    findById: (id) => database.findById(id),

    findByName: (name) => database.findOne({name}),

    findByNameWithKeyword: (query) => database.find({ name: { $regex: '.*' + query + '.*' } }),

    findByDescriptionWithKeyword: (query) => database.find({ description: { $regex: '.*' + query + '.*' } }),

    findByAllergensWithKeyword: (query) => database.find({ allergens: { $regex: '.*' + query + '.*' } }),

    create: (dish) => new database(dish).save(),

    update: (id, dish) => database.findByIdAndUpdate(id, dish),

    delete: (id) => database.findByIdAndDelete(id),
};
