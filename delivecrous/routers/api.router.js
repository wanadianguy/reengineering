import express from 'express';
import DishRouter from './dish.router.js';
import UserRouter from './user.router.js';
import AuthenticationRouter from './authentication.router.js';
import CartRouter from './cart.router.js';

const apiRouter = express.Router();

apiRouter.use('/dishes', DishRouter);
apiRouter.use('/users', UserRouter);
apiRouter.use('/auth', AuthenticationRouter);
apiRouter.use('/carts', CartRouter);

export default apiRouter;
