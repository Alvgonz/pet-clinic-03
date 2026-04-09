import { regularExp } from "../../../config/regex.js";

export class UserUpdateDto {
    constructor(
        public name?: string,
        public email?: string
    ){}

    static execute(object: { [key: string]: any }): [string, undefined] | [undefined, UserUpdateDto] {
        const { name, email} = object
        if(name === undefined && email === undefined) return ["at least one field is required", undefined]

        if(name !== undefined) {
            if(typeof name !== "string") return ["Name must be a string", undefined];
            if(!name.trim()) return ["Name cannot be empty", undefined]
        } 
        if(email !== undefined) {
            if(typeof email !== "string") return ["Email must be a string", undefined];
            if(!regularExp.email.test(email.trim().toLowerCase())) return ["email is invalid", undefined]
        }

        return [undefined, new UserUpdateDto( name?.trim().toLowerCase(), email?.trim().toLowerCase() )]

    }
}