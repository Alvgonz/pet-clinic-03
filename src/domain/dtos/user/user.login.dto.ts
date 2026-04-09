import { regularExp } from "../../../config/regex.js";

export class UserLoginDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) {}

    static execute(object: {[key: string]: any}): [string, undefined] | [undefined, UserLoginDto] {
        const {email, password} = object;

        if(!password) return ["password is required", undefined];
        if(!regularExp.password.test(password)) return ["password is invalid", undefined];
        if(!email) return ["email is required", undefined];
        if(!regularExp.email.test(email)) return ["email is invalid", undefined];

        return [undefined, new UserLoginDto(
            email.trim().toLowerCase(),
            password.trim(),
        )]
    }
}