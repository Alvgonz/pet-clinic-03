import { Doctor } from "../../../data/postgres/models/doctor.model.js";
import { CustomError } from "../../../domain/index.js";

export class FinderDoctorsService {
    async execute() {
        try {
            const doctors = await Doctor.find({
                relations: ['user'],
                select: {
                   user: {
                    name: true,
                    email: true,
                    phone_number: true,
                   }
                }
            });
            return doctors
        } catch(err) {
            throw CustomError.internalServer("Internal server error")
        }
        
    }
}