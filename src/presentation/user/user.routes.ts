import { Router } from "express";
import type { Router as RouterType, Request, Response} from 'express'
import { UserController } from "./user.controller.js";
import { FinderUsersService } from "./services/finder-users.service.js";
import { RegisterUserService } from "./services/register-user.service.js";
import { FinderUserService } from "./services/finder-user.service.js";
import { UpdateUserService } from "./services/update-user.service.js";
import { DeleteUserService } from "./services/delete-user.service.js";

export class UserRoutes {
  static get routes(): RouterType {
    const router = Router()
    const registerUser = new RegisterUserService()
    const finderUsers = new FinderUsersService()
    const finderUser = new FinderUserService()
    const updateUser = new UpdateUserService()
    const deleteUser = new DeleteUserService()
    
    const controller = new UserController(registerUser,finderUsers,finderUser,updateUser,deleteUser)

    router.get("/", controller.findAll);
    router.post("/register", controller.register);
    router.get("/:id", controller.findOne);
    router.patch("/update/:id", controller.update);
    router.delete("/delete/:id", controller.delete);

    return router;
  }
}