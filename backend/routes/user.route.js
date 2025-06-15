import { Router } from "express";
import {logout, register} from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/logout", logout)


export default userRouter