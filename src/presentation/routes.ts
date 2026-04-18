import { Router } from 'express'
import type { Router as RouterType } from "express";
import { UserRoutes } from './user/user.routes.js';
import { DoctorRoutes } from './doctor/doctor.routes.js';
import { speciesRoutes } from './species/species.routes.js';
import { PetRoutes } from './pet/pet.routes.js';

export class AppRoutes {
    static get routes(): RouterType {
        const router = Router();
        //Rutas para usuario
        router.use("/api/users", UserRoutes.routes);
        router.use("/api/doctors",DoctorRoutes.routes);
        router.use("/api/species", speciesRoutes.routes);
        router.use("/api/pets", PetRoutes.routes);

        return router;
    }
}