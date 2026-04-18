import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { envs } from "../../../config/envs.js";
import { JwtAdapter } from "../../../config/jwt.adapter.js";
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
            await this.sendLinkToEmailToValidateAccount(userData.email);
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

    private async findUserByEmail(email: string) {
        const user = await User.findOne({ where: {email: email}});
        if(!user) throw CustomError.internalServer("Email not registered in database");
            return user;
    }

    public validateAccount = async (token: string) => {
        const payload = await JwtAdapter.validateToken(token);
        if(!payload) throw CustomError.badRequest("Invalid token")
        
        const { email } = payload as { email: string };
        if(!email) throw CustomError.internalServer('Email not found in token');

        const user = await this.findUserByEmail(email);
        user.status = true;

        try {
            await user.save();

            return {
                message: "User activated"
            }
        } catch(err) {
            throw CustomError.internalServer("Something went wrong")
        }
    }

    private encriptPassword(password: string): string {
        return encriptAdapter.hash(password);
    }

    private sendLinkToEmailToValidateAccount = async (email: string) => {
        const token = await JwtAdapter.generateToken({ email }, "300s")
        if(!token) throw CustomError.internalServer("Error getting token")

        const link = `http://${envs.WEBSERVICE_URL}/api/users/validate-account/${token}`;
        const html = `
        <h1>Validate your email</h1>
        <p>Click  to validate your account</p>
        <a href=${link}>Validate account: ${email}</a>
        `
        const isSent = this.emailService.sendEmail({
            to: email,
            subject: "Validate your account",
            htmlBody: html,

        })
        if(!isSent) throw CustomError.internalServer("Email could not be sent");
    }
}