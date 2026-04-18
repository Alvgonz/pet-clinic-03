import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { envs } from "../../../config/envs.js";
import { JwtAdapter } from "../../../config/jwt.adapter.js";
import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type UserLoginDto } from "../../../domain/index.js";
import type { StringValue } from "ms"

export class LoginUserService {
    async execute(credentials: UserLoginDto) {
        //Ensure user exist
        const user = await this.ensureUserExist(credentials.email);
        //Ensure password is corret
        this.ensurePasswordIsCorrect(credentials.password, user.password);
        //Generate tokem
        const token = await this.generateToken({ id:user.id }, envs.JWT_EXIRES_IN)
        //Return token
        return {
            token: token,
            user: {
                id: user.id,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
            }
        }
    }

    private async ensureUserExist(email: string) {
        const user = await User.findOne({ where: { email: email, status: true } })

        if(!user) {
            throw CustomError.notFound("User not found");
        }

        return user
    }

    private ensurePasswordIsCorrect(unHashedPassword: string, hashedPassword: string) {
        const isMatch = encriptAdapter.compare(unHashedPassword,hashedPassword);

        if(!isMatch) {
            throw CustomError.unauthorized("Invalid credentials")
        }
    }

    private async generateToken(payload: any, duration: StringValue | number) {
        const token = await JwtAdapter.generateToken(payload, duration);
        if(!token) throw CustomError.internalServer("Error while creating token");
        return token
    }
}