import { Router } from 'express';
import { login, register, } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;

import { Router } from "express";
import {register} from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.post("/register", register)


export default userRouter

