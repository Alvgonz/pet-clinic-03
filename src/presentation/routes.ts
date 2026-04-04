import { Router } from 'express'
import type { Router as RouterType } from "express";
import { UserRoutes } from './user/user.routes.js';

export class AppRoutes {
    static get routes(): RouterType {
        const router = Router();
        //Rutas para usuario
        router.use("/api/users", UserRoutes.routes)
        //router.use("pets",PetRoutes.routes)

        return router;
    }
}