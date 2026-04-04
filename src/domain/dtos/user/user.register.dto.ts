import { regularExp } from "../../../config/regex.js";


export class UserRegisterDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public phone_number: string,
    ){}

    static excecute(object: { [key: string]: any }): [string, undefined] | [undefined, UserRegisterDto]{
        const { name, password, email, phone_number} = object

        if(!name) return ["fullname is required", undefined];
        if(!password) return ["password is required", undefined];
        if(!regularExp.password.test(password)) return ["password is invalid", undefined]
        if(!email) return ["email is required", undefined];
        if(!regularExp.email.test(email)) return ["email is invalid", undefined]
        if(!phone_number) return ["phone number is required", undefined];

        return [undefined, new UserRegisterDto(
            name.trim(), 
            password.trim(), 
            email.trim(), 
            phone_number.trim()
        )]
    }
}