import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";

export class FinderUserService {
    async execute(id: string) {
       try {
        const user = await User.findOne({
            where: { id },
            select: ["id", "name", "email", "phone_number"]
        });

        if(!user) {
            throw CustomError.notFound("User not found")
        }

        return user;
       } catch(err: any) {
        if(err instanceof CustomError) {
            throw err
        }

        if(err.code === '22P02') {
            throw CustomError.badRequest("Invalid user id")
        }

        throw CustomError.internalServer("Error trying to fetch user")
       }
        
    }

}