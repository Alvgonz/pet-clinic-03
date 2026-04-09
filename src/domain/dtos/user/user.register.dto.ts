import { regularExp } from "../../../config/regex.js";


interface Options {
    name: string,
    password: string,
    email: string,
    phone_number: string
}

export class UserRegisterDto {
    public name: string
    public password: string
    public email: string
    public phone_number: string
    constructor(options: Options){
        this.name = options.name,
        this.password = options.password,
        this.email = options.email,
        this.phone_number = options.phone_number
    }

    static excecute(object: { [key: string]: any }): [string, undefined] | [undefined, UserRegisterDto]{
        const { name, password, email, phone_number} = object

        if(!name) return ["fullname is required", undefined];
        if(!password) return ["password is required", undefined];
        if(!regularExp.password.test(password)) return ["password is invalid", undefined]
        if(!email) return ["email is required", undefined];
        if(!regularExp.email.test(email)) return ["email is invalid", undefined]
        if(!phone_number) return ["phone number is required", undefined];

        return [undefined, new UserRegisterDto({
            name: name.trim(), 
            password: password.trim(), 
            email: email.trim(), 
            phone_number: phone_number.trim()
        })]
    }
}