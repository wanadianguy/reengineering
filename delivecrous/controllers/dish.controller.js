const HttpStatus = require('http-status-codes');
const DishService = require("../services/dish.service");

const DishController = {
    findAll: async (request, response, next) => {
        response.status(HttpStatus.OK).send(await DishService.findAll());
    },

    findById: async (req, res, next) => {
        res.status(HttpStatus.OK).send(await DishService.findById(req.params.id));
    },

    findByKeyWord: async (request, response, next) => {
        try {
          const dishes = await DishService.findByKeyWord(request.query.keyword);
          if (dishes) {
            response.status(HttpStatus.OK).send(dishes);
          } else {
            response.status(HttpStatus.NOT_FOUND).send("dish not found");
          }
        } catch (error) {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
      },
    

    create: async (request, response, next) => {
        await DishService.create(request.body);
        response.status(HttpStatus.OK).send({ message: "dish created successfully" });
    },

    update: async (request, response, next) => {
        const dishId = request.params.id;
        const dishInfo = request.body;

        try {
            await DishService.update(dishId, dishInfo);
            response.status(HttpStatus.OK).send({ message: "dish updated successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `dish with id - ${dishId} not found`});
        }
    },

    delete: async (request, response, next) => {
        const dishId = request.params.id;
        
        try {
            await DishService.delete(dishId);
            response.status(HttpStatus.OK).send({ message: "dish deleted successfully"});
        } catch (error) {
            response.status(HttpStatus.NOT_FOUND).send({ message: `dish with id - ${dishId} not found`});
        }
    },
};

module.exports = DishController;