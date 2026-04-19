import { Router } from "express";
import { CreatePetService } from "./services/create-pet.service.js";
import { FindPetsService } from "./services/find-pets.service.js";
import { PetController } from "./pet.controller.js";
import { FindOneSpeciesService } from "../species/services/find-one-species.service.js";
import { AuthMiddleware } from "../common/middlewares/auth.middleware.js";

export class PetRoutes {
    static get routes(): Router {
        const router = Router()
        
        const findOneSpeciesService = new FindOneSpeciesService()
        const createPetService = new CreatePetService(findOneSpeciesService);
        const findPetsService = new FindPetsService();

        const petController = new PetController(createPetService, findPetsService);

        router.use(AuthMiddleware.protect)
        router.get("/", petController.findAll)
        router.post("/create", petController.create)

        return router
    }
}