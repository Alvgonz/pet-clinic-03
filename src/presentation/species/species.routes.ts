import { Router } from "express";
import { CreateSpeciesService } from "./services/create-species.service.js";
import { SpeciesController } from "./species.controller.js";
import { FindSpeciesService } from "./services/find-species.service.js";

export class speciesRoutes {
    static get routes(): Router {
        const router = Router()

        const createSpeciesService = new CreateSpeciesService()
        const findSpeciesService = new FindSpeciesService()

        const speciesController = new SpeciesController(createSpeciesService, findSpeciesService)

        router.get("/", speciesController.findAll)
        router.post("/create", speciesController.create)

        return router
    }
}
