import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type UserUpdateDto } from "../../../domain/index.js";

export class UpdateUserService {
    async execute(id: string, userData: UserUpdateDto) {
        try{
            const user = await User.findOneBy({ id })

            if(!user) {
                throw CustomError.notFound("User not found")
            }

            if(userData.name) {
                user.name = userData.name
            }
            if(userData.email) {
                user.email = userData.email
            }

            await user.save()
            return {
                message: "User updated successfully"
            };
        } catch(err: any) {

            if(err.code === '23505') {
                throw CustomError.conflict("Email already in use")
            }

            if(err.code === '22P02') {
                throw CustomError.unprocessableEntity("Invalid data type")
            }

            throw CustomError.internalServer("Error trying to update user")
        }
    }
}