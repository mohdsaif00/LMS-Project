
import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;

import { Router } from "express";
import {logout, register} from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/logout", logout)


export default userRouter

