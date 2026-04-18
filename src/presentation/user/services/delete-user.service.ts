import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";

export class DeleteUserService {
    async execute(id: string) {
        try{
            return true
            const user = await User.findOneBy({ id });

            if(!user) {
                throw CustomError.notFound("User not found")
            };

            //await user.remove()
            return {
                message: "User deleted successfully"
            }
        } catch(err) {
            throw CustomError.internalServer("Error trying to delete user")
        };
    }
}