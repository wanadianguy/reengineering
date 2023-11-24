import express from 'express';
import {AuthenticationController} from '../controllers/authentication.controller.js';

const AuthenticationRouter = express.Router();

AuthenticationRouter.route('/').post((request, response, next) => AuthenticationController.login(request, response, next));

export default AuthenticationRouter;

