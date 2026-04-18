import { CreateSpeciesDto } from "../../domain/dtos/species/create-specie.dto.js";
import { CustomError } from "../../domain/index.js";
import { CreateSpeciesService } from "./services/create-species.service.js";
import type { FindSpeciesService } from "./services/find-species.service.js";
import type { Request, Response } from "express";

export class SpeciesController {
    constructor(
        private readonly createSpeciesService: CreateSpeciesService,
        private readonly findSpeciesService: FindSpeciesService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError) {
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
        console.log(error);
        return res.status(500).json({
            message: "Something went worng"
        })
    }

    create = (req: Request, res: Response) => {

        const [error, createSpeciesDto] = CreateSpeciesDto.execute(req.body)

        if(error) {
            throw CustomError.badRequest(error)
        }

        this.createSpeciesService.execute(createSpeciesDto!)
        .then((data) => res.status(201).json({
            message: "Species created successfully",
            species: data
        }))
        .catch((err) => this.handleError(err, res))
    }

    findAll = (req: Request, res: Response) => {

        this.findSpeciesService.execute()
        .then((data) => res.status(200).json({
            species: data
        }))
        .catch((err) => this.handleError(err, res))
    }
}