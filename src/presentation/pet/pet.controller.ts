import { CreatePetDto, CustomError } from "../../domain/index.js";
import type { CreatePetService } from "./services/create-pet.service.js";
import type { FindPetsService } from "./services/find-pets.service.js";
import type { Request, Response } from "express";

export class PetController {
    constructor(
        private readonly createPetService: CreatePetService,
        private readonly findPetsService: FindPetsService,
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
        const [error, createPetDto] = CreatePetDto.execute(req.body)
        const user = (req as any).sessionUser

        if(error) {
            return res.status(422).json({
                message: error
            })
        }


        this.createPetService.execute(createPetDto!, user)
        .then((data) => res.status(201).json({
            message: "Pet created successfully",
            pet: data
        }))
        .catch((err) => this.handleError(err, res))
    }

    findAll = (req: Request, res: Response) => {

        const user = (req as any).sessionUser

        this.findPetsService.execute(user.id)
        .then((data) => res.status(200).json({
            user: data
        }))
        .catch((err) => this.handleError(err, res));
    }

}