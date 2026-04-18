import { Router } from "express";
import { CreatePetService } from "./services/create-pet.service.js";
import { FindPetsService } from "./services/find-pets.service.js";
import { PetController } from "./pet.controller.js";

export class PetRoutes {
    static get routes(): Router {
        const router = Router()

        const createPetService = new CreatePetService();
        const findPetsService = new FindPetsService();

        const petController = new PetController(createPetService, findPetsService);

        router.get("/", petController.findAll)
        router.post("/create", petController.create)

        return router
    }
}