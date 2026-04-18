import { CustomError, DoctorCreateDto } from "../../domain/index.js";
import type { CreateDoctorService } from "./services/create-doctor.service.js";
import type { FinderDoctorsService } from "./services/finder-doctors.service.js";
import type { Request, Response } from "express";

export class DoctorController {
    constructor(
        private readonly createDoctorService: CreateDoctorService,
        private readonly finderDoctorsService: FinderDoctorsService
    ){}

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

        const [error, doctorCreateDto] = DoctorCreateDto.execute(req.body)

        if(error) {
            return res.status(422).json({
                message: error
            })
        }

        this.createDoctorService.execute(doctorCreateDto!)
        .then((response) => res.status(201).json({response}))
        .catch((err) => this.handleError(err,res))
    }

    findAll = (req: Request, res: Response) => {
        this.finderDoctorsService.execute()
        .then((doctors) => res.status(200).json({
            message: "Doctors fetched successfully",
            doctors
        }))
    }



}