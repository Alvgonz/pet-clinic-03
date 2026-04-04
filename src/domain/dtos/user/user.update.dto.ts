import { regularExp } from "../../../config/regex.js";

export class UserUpdateDto {
    constructor(
        public name: string,
        public email: string
    ){}

    static excecute(object: { [key: string]: any }): [string, undefined] | [undefined, UserUpdateDto] {
        const { name, email} = object

        if(!name) return ["fullname is required", undefined];
        if(!email) return ["email is required", undefined];
        if(!regularExp.email.test(email)) return ["email is invalid", undefined]

        return [undefined, new UserUpdateDto( name.trim().toLowerCase(), email.trim().toLowerCase() )]

    }
}