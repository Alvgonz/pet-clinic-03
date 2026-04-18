import { Doctor } from "../../../data/postgres/models/doctor.model.js";
import { CustomError, type DoctorCreateDto } from "../../../domain/index.js";
import type { FinderUserService } from "../../user/services/finder-user.service.js";

export class CreateDoctorService {
    constructor(
        private readonly finderUserService: FinderUserService
    ) {}
    async execute(doctorData: DoctorCreateDto) {
        const doctor = new Doctor()

        doctor.speciality = doctorData.speciality;
        doctor.user = await this.finderUserService.execute(doctorData.user_id)

        try {
            await doctor.save();
            return {
                message: "User has been created",
                doctor,
            }
        } catch(err) {
            throw CustomError.internalServer("Error while creating new doctor")
        }
    }
}