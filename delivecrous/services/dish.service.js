const DishRepository = require("../repositories/dish.repository");
const CartService = require("./cart.service");

const DishService = {
    findAll: async () => {
        return await DishRepository.findAll();
    },

    findById: async(id) => {
        const dish = await DishRepository.findById(id);
        return dish;
    },

    findByKeyWord: async(query) => {
        const dishesByName = await DishRepository.findByName(query); 
        const dishesByDescription = await DishRepository.findByDescription(query);      
        const dishesByAllergens = await DishRepository.findByAllergens(query);    
     
        let dishes = dishesByName;

        for(const dish of dishesByDescription) {
            if(!await DishService.containsDish(dishes, dish)) {
                dishes.push(dish);
            }
        }

        for(const dish of dishesByAllergens) {
            if(!await DishService.containsDish(dishes, dish)) {
                dishes.push(dish);
            }
        }

        return dishes;
    },

    containsDish: async (dishes, newDish) => {
        for(const dish of dishes) {
            if(dish._id.toString() == newDish._id) {
                return true;
            }
        }
        return false;
    },

    create: async (dish) => {
        await DishRepository.create(dish);
    },

    update: async (id, dishInfo) => {
        const dish = await DishRepository.findById(id);
        if(!dish) {
            throw Error("dish not found");
        }
        return await DishRepository.update(id, dishInfo);
    },

    delete: async (id) => {
        const dish = await DishRepository.findById(id);
        if(!dish) {
            throw Error("dish not found");
        }

        await CartService.deleteDish(id);
        return await DishRepository.delete(id);
    },
};

module.exports = DishService;