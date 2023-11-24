import {DishRepository} from '../repositories/dish.repository.js';
import {CartService} from './cart.service.js';
import {DISH_ALREADY_EXISTS, DISH_NOT_FOUND} from "../constants/dish.const.js";
import {StatusError} from "../Errors/statusError.js";
import HttpStatus from "http-status-codes";

export const DishService = {
    findAll: () => DishRepository.findAll(),

    findById: (id) => DishRepository.findById(id),

    findByKeyWord: async(query) => {
        const dishesByName = await DishRepository.findByNameWithKeyword(query);
        const dishesByDescription = await DishRepository.findByDescriptionWithKeyword(query);
        const dishesByAllergens = await DishRepository.findByAllergensWithKeyword(query);
        return dishesByName.concat(dishesByDescription).concat(dishesByAllergens);
    },

    create: async (dish) => {
        const existingDish = await DishRepository.findByName(dish.name);
        if(existingDish) throw new StatusError(HttpStatus.BAD_REQUEST, DISH_ALREADY_EXISTS)
        return DishRepository.create(dish);
    },

    update: async (id, dishInfo) => {
        const dish = await DishRepository.findById(id);
        if(!dish) throw new StatusError(HttpStatus.BAD_REQUEST, DISH_NOT_FOUND);
        return DishRepository.update(id, dishInfo);
    },

    delete: async (id) => {
        const dish = await DishRepository.findById(id);
        if(!dish) throw new StatusError(HttpStatus.BAD_REQUEST, DISH_NOT_FOUND);
        await CartService.deleteDishFromCarts(id);
        return DishRepository.delete(id);
    },
};
