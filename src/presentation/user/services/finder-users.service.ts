import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";

export class FinderUsersService {
    async execute() {
        try{
            const users = await User.find( {
                select: ["id","name", "email", "phone_number", "role", "status"]
             });
            return users;
        } catch(err) {
            console.log(err);
            throw CustomError.internalServer("Error fetching users");
        }
    }
}