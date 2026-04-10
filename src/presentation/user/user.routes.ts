import { Router } from "express";
import type { Router as RouterType, Request, Response} from 'express'
import { UserController } from "./user.controller.js";
import { FinderUsersService } from "./services/finder-users.service.js";
import { RegisterUserService } from "./services/register-user.service.js";
import { FinderUserService } from "./services/finder-user.service.js";
import { UpdateUserService } from "./services/update-user.service.js";
import { DeleteUserService } from "./services/delete-user.service.js";
import { LoginUserService } from "./services/login-user.service.js";
import { EmailService } from "../common/services/email.service.js";
import { envs } from "../../config/envs.js";

export class UserRoutes {
  static get routes(): RouterType {
    const router = Router();
    const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY, envs.SEND_EMAIL);
    const registerUser = new RegisterUserService(emailService);
    const finderUsers = new FinderUsersService();
    const finderUser = new FinderUserService();
    const updateUser = new UpdateUserService();
    const deleteUser = new DeleteUserService();
    const loginUser = new LoginUserService();
    
    const controller = new UserController(registerUser,finderUsers,finderUser,updateUser,deleteUser,loginUser);

    router.get("/", controller.findAll);
    router.post("/register", controller.register);
    router.post("/login", controller.login)
    router.get("/:id", controller.findOne);
    router.patch("/update/:id", controller.update);
    router.delete("/delete/:id", controller.delete);
    router.get("/validate-account/:token", controller.validateAccount)

    return router;
  }
}