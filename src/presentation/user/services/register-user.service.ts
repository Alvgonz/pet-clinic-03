import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type UserRegisterDto } from "../../../domain/index.js";

export class RegisterUserService {
    async execute(userData: UserRegisterDto) {
        const user = new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = this.encriptPassword(userData.password);
        user.phone_number = userData.phone_number;

        try{
            await user.save()
            return {
                message: "User created successfully"
            }
        } catch(err: any) {
            
            if(err.code === '23505') {
                throw CustomError.conflict("Email already in use")
            }

            if(err.code === '22P02') {
                throw CustomError.unprocessableEntity("Invalid data type")
            }

            throw CustomError.internalServer("Error trying to create user")
        }
    }

    private encriptPassword(password: string): string {
        return encriptAdapter.hash(password);
    }
}