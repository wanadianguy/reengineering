const DishService = require("../services/dish.service");

const DishController = {
    findAll: async (req, res, next) => {
        const dishes = await DishService.findAll();
        res.status(200).send(dishes);
    },

    findById: async (req, res, next) => {
        const dishId = req.params.id;
        const dish = await DishService.findById(dishId);
        res.status(200).send(dish);
    },

    findByKeyWord: async (req, res, next) => {
        const query = req.query.keyword;
    
        try {
          const dishes = await DishService.findByKeyWord(query);
          if (dishes) {
            res.status(200).send(dishes);
          } else {
            res.status(404).send("dish not found");
          }
        } catch (error) {
          console.log(error);
          res.status(500).send();
        }
      },
    

    create: async (req, res, next) => {
        const dish = req.body;
        await DishService.create(dish);
        res.status(200).send({ message: "dish created successfully" });
    },

    update: async (req, res, next) => {
        const dishId = req.params.id;
        const dishInfo = req.body;
        try {
            await DishService.update(dishId, dishInfo);
            res.status(200).send({ message: "dish updated successfully"});
        } catch (error) {
            res.status(404).send({ message: `dish with id - ${dishId} not found`});
        }
    },

    delete: async (req, res, next) => {
        const dishId = req.params.id;
        try {
            await DishService.delete(dishId);
            res.status(200).send({ message: "dish deleted successfully"});
        } catch (error) {
            res.status(404).send({ messgae: `dish with id - ${dishId} not found`});
        }
    },
};

module.exports = DishController;