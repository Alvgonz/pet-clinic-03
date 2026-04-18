import { Router } from "express";
import { DoctorController } from "./doctor.controller.js";
import { CreateDoctorService } from "./services/create-doctor.service.js";
import { FinderDoctorsService } from "./services/finder-doctors.service.js";
import { FinderUserService } from "../user/services/finder-user.service.js";
import { AuthMiddleware } from "../common/middlewares/auth.middleware.js";
import { UserRole } from "../../data/postgres/models/user.model.js";

export class DoctorRoutes {
    static get routes(): Router {
        const router = Router()
        //Services
        const finderUserService = new FinderUserService()
        const createDoctorService = new CreateDoctorService(finderUserService);
        const finderDoctorsService = new FinderDoctorsService();
        //Conreoller
        const doctorController = new DoctorController(createDoctorService, finderDoctorsService);
        //Routes
        router.use(AuthMiddleware.protect)
        router.get("/", doctorController.findAll);
        router.post("/create",AuthMiddleware.restrictTo(UserRole.ADMIN), doctorController.create);

        return router;
    }
}