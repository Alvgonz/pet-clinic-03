import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { envs } from "../../../config/envs.js";
import { JwtAddapter } from "../../../config/jwt.adapter.js";
import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type UserRegisterDto } from "../../../domain/index.js";
import type { EmailService } from "../../common/services/email.service.js";

export class RegisterUserService {
    constructor(
        private readonly emailService: EmailService
    ) {}
    async execute(userData: UserRegisterDto) {
        const user = new User();

        user.name = userData.name;
        user.email = userData.email;
        user.password = this.encriptPassword(userData.password);
        user.phone_number = userData.phone_number;

        try{
            await user.save();
            this.sendLinkToEmailToValidateAccount(userData.email);
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

    private sendLinkToEmailToValidateAccount = async (email: string) => {
        const token = await JwtAddapter.generateToken({ email }, "300s")
        if(!token) throw CustomError.internalServer("Error getting token")

        const link = `http://${envs.WEBSERVICE_URL}/api/users/validate-account/${token}`;
        const html = `
        <h1>VAlidate your email</h1>
        <p>Click  to validate your account</p>
        <a href=${link}>Validate accoun: ${email}t</a>
        `
        const isSent = this.emailService.sendEmail({
            to: email,
            subject: "Validate your account",
            htmlBody: html,

        })
    }
}