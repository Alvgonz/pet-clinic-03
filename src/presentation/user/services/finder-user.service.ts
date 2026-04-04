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
       } catch(err) {
        console.log(err);
        throw CustomError.internalServer("Error trying to fetch user")
       }
        
    }

}