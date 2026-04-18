import { CustomError } from "../../errors/custom.error.js"

export class CreateSpeciesDto {
    constructor(
        public readonly name: string
    ){}

    static execute(object: { [key: string]: any}): [string, undefined] | [undefined, CreateSpeciesDto] {
        const { name } = object

        if(!name) return ["Name of the species is required", undefined]

        return [undefined, new CreateSpeciesDto(name.trim().toLowerCase())]
        
    }
}